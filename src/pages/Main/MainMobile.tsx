import styled, { keyframes } from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

import { OBJECT_SETS } from './data/ObjectDataMobile';

import Model from './Model/Model';
import { isGlobalFirstRender } from './Model/Model';

import { IoMdPhoneLandscape } from 'react-icons/io';
import { TbHandClick } from 'react-icons/tb';

const MainContainer = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const fadeInOut = keyframes`
  0% { opacity: 0;}      
  20% { opacity: 0.5;}    
  80% { opacity: 0.5;}   
  100% { opacity: 0;}     
`;

const mouseClick = keyframes`
  0% { transform: translate(-40%, -40%); opacity: 1; }
  40% { transform: translate(-50%, -50%); opacity: 1;}
  50% { transform: translate(-45%, -45%); opacity: 1;}
  60% { transform: translate(-50%, -50%); opacity: 1;}
  100% { transform: translate(-45%, -45%); opacity: 0;}
`;

const deviceShake = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0;}
  25% { transform: translate(-50%, -50%) rotate(20deg); opacity: 1;}
  50% { transform: translate(-50%, -50%) rotate(-20deg); opacity: 1;}
  75% { transform: translate(-50%, -50%) rotate(20deg); opacity: 1;}
  100% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1;}
`;

const InteractionGuide = styled.div`
  width: 30vw;
  height: 30vw;
  background: rgba(139, 139, 139, 0.5);
  border-radius: 20%;
  opacity: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  pointer-events: none;

  animation: ${fadeInOut} 4.4s ease-in-out forwards;

  svg {
    width: 70%;
    height: auto;
    object-fit: contain;
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #000;
    transform: translate(-50%, -50%);
  }
  svg:first-child {
    animation: ${mouseClick} 1.7s ease-in-out forwards;
  }
  svg:last-child {
    opacity: 0;
    animation: ${deviceShake} 1.7s 1.7s ease-in-out forwards;
  }
`;

const AdaptiveZoom = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const width = size.width;
      let newZoom = 160;
      if (width < 440) {
        newZoom = 44;
      } else if (width < 768) {
        newZoom = 80;
      } else if (width < 1200) {
        newZoom = 120;
      } else if (width < 1700) {
        newZoom = 145;
      } else {
        newZoom = 160;
      }
      camera.zoom = newZoom;
      camera.updateProjectionMatrix();
    }
  }, [size.width, camera]);

  return null;
};

const CameraRig = ({ isRotated }: { isRotated: boolean }) => {
  const { camera } = useThree();

  const isFirstTimeEver = useRef<boolean>(isGlobalFirstRender);

  useEffect(() => {
    camera.lookAt(0, -5.5, 0);
  }, [camera]);

  useEffect(() => {
    if (!isRotated) return;

    const targetRotation = Math.PI / 2;

    if (isFirstTimeEver.current) {
      gsap.to(camera.rotation, {
        z: Math.PI / 2,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix(),
        onComplete: () => {
          isFirstTimeEver.current = false;
        },
      });
    } else {
      camera.rotation.z = targetRotation;
      camera.updateProjectionMatrix();
    }
  }, [isRotated, camera]);

  return null;
};

const MainMobile = () => {
  const [index, setIndex] = useState(0);
  const [isRotated, setIsRotated] = useState(!isGlobalFirstRender);

  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isGlobalFirstRender) {
      const showTimer = setTimeout(() => {
        setShowGuide(true);
      }, 5000);

      const hideTimer = setTimeout(() => {
        setShowGuide(false);
      }, 9400);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  useEffect(() => {
    if (isGlobalFirstRender) {
      const timer = setTimeout(() => {
        setIsRotated(true);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCanvasClick = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setIndex((prev) => (prev + 1) % OBJECT_SETS.length);
          }
        })
        .catch(console.error);
      setShowGuide(false);
    } else {
      setIndex((prev) => (prev + 1) % OBJECT_SETS.length);
      setShowGuide(false);
    }
  };

  return (
    <MainContainer onClick={handleCanvasClick}>
      <div
        style={{ width: '100vw', height: '100vh', background: 'transparent' }}
      >
        <Canvas
          orthographic
          camera={{
            position: [70, 0, -90],
            far: 1000,
            zoom: 160,
          }}
        >
          <AdaptiveZoom />

          <CameraRig isRotated={isRotated} />

          <Suspense fallback={null}>
            {OBJECT_SETS.map((set, setIdx) => (
              <group key={setIdx}>
                {set.map((obj, i) => (
                  <Model
                    key={`${setIdx}-${i}`}
                    url={obj.url}
                    position={obj.position as [number, number, number]}
                    afterPosition={(obj as any).afterPosition}
                    rotation={
                      obj.rotation.map(THREE.MathUtils.degToRad) as [
                        number,
                        number,
                        number,
                      ]
                    }
                    scale={obj.scale}
                    isInteractive={setIdx === index}
                    visible={setIdx === index}
                  />
                ))}
              </group>
            ))}
          </Suspense>
        </Canvas>
      </div>
      {showGuide && (
        <InteractionGuide>
          <TbHandClick />
          <IoMdPhoneLandscape />
        </InteractionGuide>
      )}
    </MainContainer>
  );
};

export default MainMobile;

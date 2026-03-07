import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './Model/Model';
import { OBJECT_SETS } from './data/ObjectDataMobile';
import * as THREE from 'three';
// import TextAnimation from './Animation/TextAnimationMobile';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

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

  useEffect(() => {
    camera.lookAt(0, -5.5, 0);
  }, [camera]);

  useEffect(() => {
    const targetRotation = isRotated ? Math.PI / 2 : Math.PI;

    gsap.to(camera.rotation, {
      z: targetRotation,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  }, [isRotated, camera]);

  return null;
};

const MainMobile = () => {
  const [index, setIndex] = useState(0);
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRotated(true);
    }, 4200);
    return () => clearTimeout(timer);
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
    } else {
      setIndex((prev) => (prev + 1) % OBJECT_SETS.length);
    }
  };

  return (
    <MainContainer onClick={handleCanvasClick}>
      {/* <TextAnimation /> */}
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
    </MainContainer>
  );
};

export default MainMobile;

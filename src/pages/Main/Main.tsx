import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './Model/Model';
import { OBJECT_SETS } from './data/ObjectData';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import { isGlobalFirstRender } from './Model/Model';
import { LuMouse } from 'react-icons/lu';
import { PiCursorClickBold } from 'react-icons/pi';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
  position: relative;
  display: flex;
  overflow: hidden;
`;

const fadeInOut = keyframes`
  0% { opacity: 0;}      
  20% { opacity: 0.5;}    
  80% { opacity: 0.5;}   
  100% { opacity: 0;}     
`;

const mouseMove = keyframes`
  0% { transform: translate(-50%, -50%); opacity: 1;}
  25% { transform: translate(-70%, -50%); opacity: 1;}
  50% { transform: translate(-50%, -50%); opacity: 1;}
  75% { transform: translate(-30%, -50%); opacity: 1;}
  100% { transform: translate(-50%, -50%); opacity: 0;}
`;

const mouseClick = keyframes`
  0% { transform: translate(-40%, -40%); opacity: 0; }
  40% { transform: translate(-50%, -50%); opacity: 1;}
  50% { transform: translate(-45%, -45%); opacity: 1;}
  60% { transform: translate(-50%, -50%); opacity: 1;}
  100% { transform: translate(-45%, -45%); opacity: 1;}
`;

const InteractionGuide = styled.div`
  width: 10vw;
  height: 10vw;
  background: rgba(139, 139, 139, 0.5);
  border-radius: 20%;
  opacity: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    animation: ${mouseMove} 1.7s ease-in-out forwards;
  }
  svg:last-child {
    opacity: 0;
    animation: ${mouseClick} 1.7s 1.7s ease-in-out forwards;
  }
`;

const AdaptiveZoom = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const width = size.width;
      let newZoom = 160;

      if (width < 430) {
        newZoom = 40;
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

const Main = () => {
  const [index, setIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isGlobalFirstRender) {
      const showTimer = setTimeout(() => {
        setShowGuide(true);
      }, 4000);

      const hideTimer = setTimeout(() => {
        setShowGuide(false);
      }, 8400);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleCanvasClick = () => {
    setShowGuide(false);
    setIndex((prev) => (prev + 1) % OBJECT_SETS.length);
  };

  return (
    <MainContainer onClick={handleCanvasClick}>
      <div
        style={{ width: '100vw', height: '100vh', background: 'transparent' }}
      >
        <Canvas
          orthographic
          camera={{ position: [10, 2, -10], far: 1000, zoom: 160 }}
        >
          <AdaptiveZoom />

          <Suspense fallback={null}>
            {OBJECT_SETS.map((set, setIdx) => (
              <group key={setIdx}>
                {set.map((obj, i) => (
                  <Model
                    key={`${setIdx}-${i}`}
                    url={obj.url}
                    position={obj.position as [number, number, number]}
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
          <LuMouse />
          <PiCursorClickBold />
        </InteractionGuide>
      )}
    </MainContainer>
  );
};

export default Main;

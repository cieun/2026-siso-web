import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './Model/Model';
import { OBJECT_SETS } from './data/ObjectData';
import * as THREE from 'three';
import TextAnimation from './Animation/TextAnimation';
import { useThree } from '@react-three/fiber';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
  position: relative;
  display: flex;
  overflow: hidden;
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

  const handleCanvasClick = () => {
    setIndex((prev) => (prev + 1) % OBJECT_SETS.length);
  };

  return (
    <MainContainer onClick={handleCanvasClick}>
      {/* <TextAnimation /> */}
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
    </MainContainer>
  );
};

export default Main;

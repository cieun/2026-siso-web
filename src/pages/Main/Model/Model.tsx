import { useRef, useEffect, useState, useMemo } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

let isGlobalFirstRender = true;

gsap.registerPlugin(CustomEase);

CustomEase.create(
  'fourBounces',
  'M0,0 C0.05,0 0.18,0.35 0.28,1 L0.28,1 C0.35,0.6 0.43,0.6 0.5,0.6 C0.57,0.6 0.65,1 0.65,1 L0.65,1 C0.7,0.72 0.76,0.72 0.8,0.72 C0.84,0.72 0.9,1 0.9,1 L0.9,1 C0.92,0.9 0.96,0.9 0.98,0.9 C1,0.9 1,1 1,1',
);

interface ModelProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isInteractive?: boolean;
  visible: boolean;
}

const Model = ({
  url,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isInteractive = false,
  visible,
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // 💡 메쉬 재질 및 렌더링 설정
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.renderOrder = 1;
        if (child.material) {
          Object.assign(child.material, {
            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            polygonOffset: true,
            polygonOffsetFactor: -1.0,
            polygonOffsetUnits: -4.0,
          });
        }
      }
    });
  }, [clonedScene]);

  // 💡 메인 애니메이션 로직
  useEffect(() => {
    const target = groupRef.current;
    if (!target) return;

    const isDot = url.includes('dot');
    const isBar = url.includes('bar');

    // [초기 위치/스케일 설정]
    if (isGlobalFirstRender && visible) {
      target.position.set(position[0], position[1] + 6, position[2]);
      target.scale.set(0, 0, 0);
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
    } else {
      target.position.set(position[0], position[1], position[2]);
      target.scale.set(0, 0, 0); // 일단 모두 0으로 시작 (두 번째 useEffect에서 키워줄 거예요)
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
    }

    // [첫 렌더링 전용 화려한 등장]
    if (isGlobalFirstRender && visible) {
      if (isDot) {
        gsap.to(target.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 1.0,
          ease: 'elastic.out(1, 0.75)',
          delay: isDot ? 0 : 0.2,
        });

        // target.position.x = position[0] - 5;
        // target.position.z = position[2] + 2;
        target.rotation.set(
          rotation[0] - Math.PI * 0.5,
          rotation[1] - Math.PI * 4,
          rotation[2],
        );
        gsap.to(target.position, {
          y: position[1],
          duration: 2.4,
          ease: 'fourBounces',
          onComplete: () => {
            setIsAnimationFinished(true);
            isGlobalFirstRender = false;
          },
        });
        gsap.to(target.position, {
          x: position[0],
          z: position[2],
          duration: 2.4,
          ease: 'none',
        });
        gsap.to(target.rotation, {
          x: rotation[0],
          y: rotation[1],
          duration: 2.7,
          ease: 'power0.in',
        });
      } else {
        // 💡 1. Bar와 Arc는 낙하 애니메이션 시작 전까지 scale을 0으로 꽉 묶어둡니다.
        target.scale.set(0, 0, 0);

        gsap.to(target.position, {
          y: position[1],
          duration: isBar ? 0.8 : 1.2,
          ease: 'elastic.out(0.5, 0.8)',
          delay: 2.8, // 💡 Dot이 안착할 때까지 기다리는 시간
          onStart: () => {
            // 💡 2. [핵심] 실제로 낙하가 시작되는 순간에만 scale을 키웁니다.
            // 이렇게 하면 공중에 떠 있는 동안(2.8초)에는 절대 보이지 않아요!
            gsap.to(target.scale, {
              x: scale,
              y: scale,
              z: scale,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
          onComplete: () => {
            setIsAnimationFinished(true);
            isGlobalFirstRender = false;
          },
        });
      }
    } else if (!isGlobalFirstRender) {
      setIsAnimationFinished(true);
    }

    return () => {
      gsap.killTweensOf(target.position);
      gsap.killTweensOf(target.scale);
    };
  }, [url, visible, rotation]);

  useEffect(() => {
    const target = groupRef.current;
    if (!target || isGlobalFirstRender) return; // 첫 낙하 중에는 실행 안 함

    if (visible) {
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
      // 나타날 때 (Scale Up)
      gsap.to(target.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
        delay: url.includes('dot') ? 0 : 0.1,
      });
    } else {
      // 사라질 때 (Scale Down)
      gsap.to(target.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: 'back.in(1.7)',
      });
    }
  }, [visible, scale, url, rotation]);

  // 💡 마우스 인터랙션
  useFrame((state) => {
    const isDot = url.includes('dot');
    if (!isInteractive || !isAnimationFinished || !groupRef.current || isDot)
      return;

    const mouseX = state.mouse.x;

    // 💡 마우스 움직임에 따른 추가 각도 (기존 -5~10도 범위)
    const minDeg = -5;
    const maxDeg = 15;
    const mouseRad = THREE.MathUtils.degToRad(
      minDeg + (mouseX + 1) * ((maxDeg - minDeg) / 2),
    );

    // 💡 [핵심] 기본 데이터의 z축 값(rotation[2])에 마우스 각도를 더합니다.
    const targetRad = rotation[2] + mouseRad;

    // 부드럽게 따라오도록 보간(Lerp) 적용
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRad,
      0.1,
    );
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
};

export default Model;

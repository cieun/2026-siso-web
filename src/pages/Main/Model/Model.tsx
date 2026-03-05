import { useRef, useEffect, useState, useMemo } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

let isGlobalFirstRender = true;
let tiltX = 0;

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

  useEffect(() => {
    const target = groupRef.current;
    if (!target) return;

    const isDot = url.includes('dot');
    const isBar = url.includes('bar');

    if (isGlobalFirstRender && visible) {
      target.position.set(position[0], position[1] + 6, position[2]);
      target.scale.set(0, 0, 0);
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
    } else {
      target.position.set(position[0], position[1], position[2]);
      target.scale.set(0, 0, 0);
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
    }

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
        target.scale.set(0, 0, 0);

        gsap.to(target.position, {
          y: position[1],
          duration: isBar ? 0.8 : 1.2,
          ease: 'elastic.out(0.5, 0.8)',
          delay: 2.8,
          onStart: () => {
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
    if (!target || isGlobalFirstRender) return;

    if (visible) {
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
      gsap.to(target.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
        delay: url.includes('dot') ? 0 : 0.1,
      });
    } else {
      gsap.to(target.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: 'back.in(1.7)',
      });
    }
  }, [visible, scale, url, rotation]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // gamma는 기기를 좌우로 흔들 때의 값입니다 (-90 ~ 90)
      if (e.gamma !== null) {
        // -30도 ~ 30도 범위를 -1 ~ 1 사이의 값으로 변환
        tiltX = THREE.MathUtils.clamp(e.gamma / 30, -1, 1);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  useFrame((state) => {
    const isDot = url.includes('dot');
    if (!isInteractive || !isAnimationFinished || !groupRef.current || isDot)
      return;

    const inputX = Math.abs(tiltX) > 0.01 ? tiltX : state.mouse.x;

    const minDeg = -5;
    const maxDeg = 15;
    const mouseRad = THREE.MathUtils.degToRad(
      minDeg + (inputX + 1) * ((maxDeg - minDeg) / 2),
    );

    const targetRad = rotation[2] + mouseRad;

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

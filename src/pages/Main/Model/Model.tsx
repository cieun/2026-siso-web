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

CustomEase.create(
  'mobileBounces',
  'M0,0 C0.05,0 0.18,0.35 0.28,1 L0.28,1 C0.35,0.72 0.43,0.72 0.5,0.72 C0.57,0.72 0.65,1 0.65,1 L0.65,1 C0.7,0.82 0.76,0.82 0.8,0.82 C0.84,0.82 0.9,1 0.9,1 L0.9,1 C0.92,0.92 0.96,0.92 0.98,0.92 C1,0.92 1,1 1,1',
);

interface ModelProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  position: [number, number, number];
  afterPosition?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isInteractive?: boolean;
  visible: boolean;
}

const Model = ({
  url,
  position,
  afterPosition,
  rotation = [0, 0, 0],
  scale = 1,
  isInteractive = false,
  visible,
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const isMobile = window.innerWidth < 768;
  const finalTargetScale = isMobile ? scale * 1.5 : scale;

  useEffect(() => {
    const target = groupRef.current;
    if (!target) return;
    const isDot = url.includes('dot');
    const isBar = url.includes('bar');

    const dropHeight = isMobile ? 24 : 6;
    const mobileMultiplier = 1.8;
    const baseDuration = isBar ? 0.8 : 1.2;
    const finalDuration = isMobile
      ? baseDuration * mobileMultiplier
      : baseDuration;
    const currentEase = isMobile ? 'mobileBounces' : 'fourBounces';

    if (isGlobalFirstRender && visible) {
      target.position.set(position[0], position[1] + dropHeight, position[2]);
      target.scale.set(0, 0, 0);
      target.rotation.set(rotation[0], rotation[1], rotation[2]);

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimationFinished(true);
          isGlobalFirstRender = false;
        },
      });

      if (isDot) {
        const dotDuration = isMobile ? 2.8 : 2.4;
        target.rotation.set(
          rotation[0] + Math.PI * 0.5,
          rotation[1] + Math.PI * 3,
          rotation[2],
        );

        tl.to(
          target.scale,
          {
            x: scale,
            y: scale,
            z: scale,
            duration: 1.0,
            ease: 'elastic.out(1, 0.75)',
          },
          0,
        )
          .to(
            target.position,
            {
              y: position[1],
              duration: dotDuration,
              ease: currentEase,
            },
            0,
          )
          .to(
            target.position,
            {
              x: position[0],
              z: position[2],
              duration: dotDuration,
              ease: 'none',
            },
            0,
          )
          .to(
            target.rotation,
            {
              x: rotation[0],
              y: rotation[1],
              duration: dotDuration + 0.4,
              ease: 'power1.in',
            },
            0,
          );
      } else {
        tl.to(
          target.position,
          {
            y: position[1],
            duration: finalDuration,
            ease: 'elastic.out(0.5, 0.8)',
            delay: isMobile ? 3.0 : 2.8,
            onStart: () => {
              gsap.to(target.scale, {
                x: scale,
                y: scale,
                z: scale,
                duration: 0.4,
                ease: 'power2.out',
              });
            },
          },
          0,
        );
      }

      if (isMobile) {
        const finalPos = afterPosition || position;

        tl.to(
          target.scale,
          {
            x: finalTargetScale,
            y: finalTargetScale,
            z: finalTargetScale,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          4.8,
        );
        tl.to(
          target.position,
          {
            x: finalPos[0],
            y: finalPos[1],
            z: finalPos[2],
            duration: 1.2,
            ease: 'power2.inOut',
          },
          4.45,
        );
      }
    } else if (!isGlobalFirstRender) {
      setIsAnimationFinished(true);
    } else {
      target.position.set(position[0], position[1], position[2]);
      target.scale.set(0, 0, 0);
      target.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
    return () => {
      gsap.killTweensOf(target.position);
      gsap.killTweensOf(target.scale);
    };
  }, [
    visible,
    afterPosition,
    position,
    scale,
    finalTargetScale,
    isMobile,
    url,
  ]);

  useEffect(() => {
    const target = groupRef.current;
    if (!target || isGlobalFirstRender) return;

    if (visible) {
      const exitDuration = 0.3;
      const staggeredDelay = url.includes('dot') ? 0 : 0.1;

      gsap.to(target.scale, {
        x: finalTargetScale,
        y: finalTargetScale,
        z: finalTargetScale,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
        delay: exitDuration + staggeredDelay,
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
  }, [visible, finalTargetScale, url]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const angle = Math.atan2(e.gamma, e.beta);

        const orientation = window.orientation || 0;

        let targetTilt = 0;
        const rad90 = Math.PI / 2;

        if (orientation === 90) {
          targetTilt = angle - rad90;
        } else if (orientation === -90) {
          targetTilt = angle + rad90;
        } else {
          targetTilt = angle;
        }
        tiltX = THREE.MathUtils.clamp(targetTilt / (Math.PI / 6), -1, 1);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame((state) => {
    const isDot = url.includes('dot');

    if (!isInteractive || !isAnimationFinished || !groupRef.current || isDot)
      return;

    const inputX = Math.abs(tiltX) > 0.01 ? tiltX : state.mouse.x;

    const minDeg = 0;
    const maxDeg = 30;
    const targetRad = THREE.MathUtils.degToRad(
      minDeg + (inputX + 1) * ((maxDeg - minDeg) / 2),
    );

    const baseRotZ = rotation[2];

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      baseRotZ + targetRad,
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

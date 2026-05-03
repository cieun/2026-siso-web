import styled from 'styled-components';
import { motion } from 'framer-motion';

import Box1 from '../assets/poster_label_1.svg';
import Box2 from '../assets/poster_label_2.svg';
import Box3 from '../assets/poster_label_3.svg';
import Box4 from '../assets/poster_label_4.svg';
import Box5 from '../assets/poster_label_5.svg';
import Guide from '../assets/guide.svg';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const MasterGroup = styled.div`
  position: relative;
  width: 350px;
  height: 240px;
`;

const TextAnimationMobile = () => {
  const isDebugMode = false;

  const boxData = [
    { src: Box1, x: 75, y: 12, scale: 0.8 },
    { src: Box2, x: 58, y: 28, scale: 1.85 },
    { src: Box3, x: 115, y: 44, scale: 4.0 },
    { src: Box4, x: 63, y: 72, scale: 4.3 },
    { src: Box5, x: 57, y: 105, scale: 2 },
  ];

  interface BoxAnimation {
    initial: any;
    animate: any;
  }

  const getBoxAnimation = (i: number): BoxAnimation => {
    const data = boxData[i];
    const baseDelay = 0;
    const delay = baseDelay + (4 - i) * 0.33;

    const baseInitial = {
      opacity: 0,
      x: data.x,
      y: data.y,
      scale: data.scale,
    };

    if (i === 4) {
      const startY = -250;
      return {
        initial: { ...baseInitial, y: -300 },
        animate: {
          opacity: [0, 1, 1, 1],
          x: data.x,
          y: [startY, data.y, data.y - 30, data.y],
          transition: {
            opacity: { times: [0, 0.1, 0.1, 1], duration: 0.6, delay },
            y: {
              times: [0, 0.5, 0.75, 1],
              duration: 1,
              ease: ['easeIn', 'easeOut', 'easeIn'],
              delay,
            },
          },
        },
      };
    }
    if (i === 3) {
      const startX = data.x - 20;
      const startY = -200;
      return {
        initial: { ...baseInitial, x: startX, y: startY, opacity: 0 },
        animate: {
          opacity: [0, 1, 1, 1],
          x: [startX, startX, data.x],
          y: [startY, data.y - 5, data.y - 20, data.y],
          transition: {
            opacity: { times: [0, 0.1, 0.1, 1], duration: 0.6, delay },
            x: {
              times: [0, 0.5, 1],
              ease: 'linear',
              duration: 1,
              delay,
            },
            y: {
              times: [0, 0.5, 0.65, 1],
              ease: ['easeIn', 'easeOut', 'easeIn'],
              duration: 1,
              delay,
            },
          },
        },
      };
    }

    if (i === 2) {
      const startX = data.x - 20;
      const startY = -150;

      return {
        initial: { ...baseInitial, x: startX, y: startY, opacity: 0 },
        animate: {
          opacity: [0, 1, 1, 1],
          x: [startX, startX, data.x],
          y: [startY, data.y - 5, data.y - 20, data.y],
          transition: {
            opacity: { times: [0, 0.1, 0.1, 1], duration: 0.6, delay },
            x: {
              times: [0, 0.5, 1],
              ease: 'linear',
              duration: 1,
              delay,
            },
            y: {
              times: [0, 0.5, 0.65, 1],
              ease: ['easeIn', 'easeOut', 'easeIn'],
              duration: 1,
              delay,
            },
          },
        },
      };
    }

    if (i === 1) {
      const startX = data.x + 20;
      const startY = -100;
      return {
        initial: { ...baseInitial, x: startX, y: startY, opacity: 0 },
        animate: {
          opacity: [0, 1, 1, 1],
          x: [startX, startX, data.x],
          y: [startY, data.y - 5, data.y - 20, data.y],
          transition: {
            opacity: { times: [0, 0.1, 0.1, 1], duration: 0.6, delay },
            x: {
              times: [0, 0.5, 1],
              ease: 'linear',
              duration: 1,
              delay,
            },
            y: {
              times: [0, 0.5, 0.65, 1],
              ease: ['easeIn', 'easeOut', 'easeIn'],
              duration: 1,
              delay,
            },
          },
        },
      };
    }

    if (i === 0) {
      const startY = data.y - 70;
      return {
        initial: {
          opacity: 0,
          x: data.x,
          y: startY,
          scale: data.scale * 0.5,
          rotate: 0,
        },
        animate: {
          opacity: 1,
          scale: [data.scale * 0.5, data.scale],
          rotate: [0, 225, 360],
          x: data.x,
          y: [startY, data.y - 100, data.y, data.y - 60, data.y],
          transition: {
            opacity: { duration: 0.17, delay },
            scale: { duration: 0.17, delay },
            y: {
              times: [0, 0.2, 0.6, 0.8, 1],
              ease: [
                'easeIn', //올라감
                '[0.68, 0, 1, 0.16]', //내려감
                '[0, 0.79, 0.37, 1]', //올라감
                'easeOut', //내려감
              ],
              duration: 1.1,
              delay,
            },
            rotate: {
              times: [0, 0.6, 1],
              duration: 1.1,
              ease: ['[0, 0, 0.8, 1]', '[0, 0.9, 1, 1]'],
              delay,
            },
          },
        },
      };
    }

    return {
      initial: baseInitial,
      animate: { ...baseInitial, opacity: 1 },
    };
  };

  return (
    <>
      <TextContainer>
        <MasterGroup>
          {boxData.map((data, i) => {
            const anim = getBoxAnimation(i);
            return (
              <motion.div
                key={i}
                initial={isDebugMode ? anim.animate : anim.initial}
                animate={anim.animate}
                style={{
                  position: 'absolute',
                  left: data.x,
                  top: data.y,
                  translateX: '-50%',
                  translateY: '-50%',
                  originX: 0.5,
                  originY: 0.5,
                  zIndex: 5 - i,
                }}
              >
                <img
                  src={data.src}
                  alt={`Label-${i}`}
                  style={{ display: 'block', width: '60px' }}
                />
              </motion.div>
            );
          })}
        </MasterGroup>
      </TextContainer>
      <div style={{ position: 'fixed', top: '120px', left: '24px' }}>
        <img src={Guide} style={{ width: '350px', display: 'none' }} />
      </div>
    </>
  );
};

export default TextAnimationMobile;

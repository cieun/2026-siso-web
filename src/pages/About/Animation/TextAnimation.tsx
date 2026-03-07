import { motion } from 'framer-motion';
import styled from 'styled-components';

// import GroupNames from '../assets/poster_clubTexts.svg';
import Box1 from '../assets/poster_label_1.svg';
import Box2 from '../assets/poster_label_2.svg';
import Box3 from '../assets/poster_label_3.svg';
import Box4 from '../assets/poster_label_4.svg';
import Box5 from '../assets/poster_label_5.svg';

import Guide from '../assets/guide.svg';

// type Variants = {
//   [key: string]: any;a
// };

const TextContainer = styled.div`
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  // position: absolute;
  // left: 0;
  // bottom: 36px;
`;

const FallingText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MasterGroup = styled.div`
  position: relative;
  width: 620px;
  height: 410px;
`;

const TextAnimation = () => {
  const isDebugMode = false;

  // const groupNamesVariants: Variants = {
  //   hidden: { opacity: 0, x: -50 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.8, ease: 'easeOut', delay: 6 },
  //   },
  // };

  const boxData = [
    { src: Box1, x: 138, y: 20, scale: 0.84 },
    { src: Box2, x: 110, y: 47, scale: 1.93 },
    { src: Box3, x: 206, y: 75, scale: 4.1 },
    { src: Box4, x: 115, y: 122, scale: 4.3 },
    { src: Box5, x: 110, y: 180, scale: 2 },
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
        {/* <motion.div
          variants={groupNamesVariants}
          initial={isDebugMode ? 'visible' : 'hidden'}
          animate="visible"
          style={{ originX: 0 }}
        >
          <img
            src={GroupNames}
            alt="Names"
            style={{ width: '100px', transform: 'scale(1)' }}
          />
        </motion.div> */}

        <FallingText>
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
                    style={{ display: 'block', width: '100px' }}
                  />
                </motion.div>
              );
            })}
          </MasterGroup>
        </FallingText>
      </TextContainer>
      <div style={{ position: 'fixed', bottom: '36px', left: '36px' }}>
        <img src={Guide} style={{ width: '600px', display: 'none' }} />
      </div>
    </>
  );
};

export default TextAnimation;

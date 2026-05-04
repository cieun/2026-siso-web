import styled, { keyframes } from 'styled-components';
import { introData } from '../data/introData';
import { AboutSection } from './AboutSection';
import TextAnimation from '../Animation/TextAnimation';

import Poster1 from '../assets/intro_poster_1.jpg';
import Poster2 from '../assets/intro_poster_2.jpg';
import Poster3 from '../assets/intro_poster_3.jpg';
import Poster4 from '../assets/intro_poster_4.jpg';

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
  height: 100%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 32px;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(24vw * 1.4 - 25px); //포스터 이미지 너비 * 높이 비율 +- 조절
  margin-left: -50px;

  @media (min-width: 768px) and (max-width: 1100px) {
    && span.content-text {
      font-size: 1.8rem;
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: start;
  gap: 0.8rem 20px;
  font-size: 2rem;
`;

const InfoLabel = styled.span`
  font-weight: 800;
  color: #000;
`;

const InfoValue = styled.span`
  font-weight: 600;
  line-height: 1.4;
  color: #000;
`;

const slide = keyframes`
0%, 20% { transform: translateX(0); }
  25%, 45% { transform: translateX(calc(((-47vw + 20px) / 2) - 20px)); }
  50%, 70% { transform: translateX(calc(((-47vw + 20px) / 2 - 20px) * 2)); }
  75%, 95% { transform: translateX(calc(((-47vw + 20px) / 2 - 20px) * 3)); }
  100% { transform: translateX(calc(((-47vw + 20px) / 2 - 20px) * 4)); }
`;

const PosterGrid = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  width: 47vw;
  aspect-ratio: 1 / 0.7;
  contain: paint;
  overflow: hidden;
`;

const SlideTrack = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  animation: ${slide} 15s ease-in-out infinite;
`;

const PosterImage = styled.img`
  flex-shrink: 0;
  width: calc((47vw - 20px) / 2);
  height: 100%;
  object-fit: cover;
`;

const IntroSection = () => {
  const posters = [Poster1, Poster2, Poster3, Poster4];

  return (
    <AboutSection>
      <LeftColumn>
        <TitleContainer>
          <TextAnimation />
        </TitleContainer>
        <div>
          <InfoGrid>
            {introData.info.map((item, index) => (
              <div key={index} style={{ display: 'contents' }}>
                <InfoLabel>{item.label}</InfoLabel>
                <InfoValue>{item.value}</InfoValue>
              </div>
            ))}
          </InfoGrid>
        </div>
      </LeftColumn>

      <RightColumn>
        <PosterGrid>
          <SlideTrack>
            {posters.map((img, i) => (
              <PosterImage key={`origin-${i}`} src={img} alt={`Poster ${i}`} />
            ))}
            {posters.map((img, i) => (
              <PosterImage key={`clone-${i}`} src={img} alt={`Poster ${i}`} />
            ))}
          </SlideTrack>
        </PosterGrid>

        <p>{introData.description}</p>
      </RightColumn>
    </AboutSection>
  );
};

export default IntroSection;

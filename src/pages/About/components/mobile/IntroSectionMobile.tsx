import styled, { keyframes } from 'styled-components';
import { introData } from '../../data/introData';
import { AboutSection } from '../AboutSection';
import TextAnimation from '../../Animation/TextAnimationMobile';

import Poster1 from '../../assets/intro_poster_1.jpg';
import Poster2 from '../../assets/intro_poster_2.jpg';
import Poster3 from '../../assets/intro_poster_3.jpg';
import Poster4 from '../../assets/intro_poster_4.jpg';

const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 84px);
  margin-bottom: 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45vh;
  font-weight: 800;
`;

const slide = keyframes`
  0%, 20% { transform: translateX(0); }
  25%, 45% { transform: translateX(-100%); }
  50%, 70% { transform: translateX(-200%); }
  75%, 95% { transform: translateX(-300%); }
  100% { transform: translateX(-400%); }
`;

const PosterGrid = styled.div`
  display: flex;
  position: relative;
  width: calc(100vw - 48px);
  aspect-ratio: 1 / 1.414;
  margin: 0 auto 20px auto;
  overflow: hidden;
`;

const SlideTrack = styled.div`
  display: flex;
  gap: 0;
  width: calc(100vw - 48px);
  animation: ${slide} 15s ease-in-out infinite;
`;

const PosterImage = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const IntroSectionMobile = () => {
  const posters = [Poster1, Poster2, Poster3, Poster4];

  return (
    <AboutSection>
      <ContentContainer>
        <TitleContainer>
          <TextAnimation />
        </TitleContainer>
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
      </ContentContainer>
      <InfoGrid>
        {introData.info.map((item, index) => (
          <div key={index} style={{ display: 'contents' }}>
            <InfoLabel>{item.label}</InfoLabel>
            <InfoValue>{item.value}</InfoValue>
          </div>
        ))}
      </InfoGrid>

      <p>{introData.description}</p>
    </AboutSection>
  );
};

export default IntroSectionMobile;

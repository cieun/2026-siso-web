import styled, { keyframes } from 'styled-components';
import { AboutSection } from '../AboutSection';
import TextBox from '../../../../components/common/TextBox';
import { introData } from '../../data/introData';

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
  margin: 100px 0 80px 0;
  font-weight: 800;

  @media (min-width: 400px) and (max-width: 768px) {
    && span.content-text {
      font-size: 2.2rem;
    }
  }
`;

const MOBILE_POSTER_WIDTH = 'calc(100vw - 48px)';

const slide = keyframes`
  0%, 20% { transform: translateX(0); }
  25%, 45% { transform: translateX(calc(-1 * ${MOBILE_POSTER_WIDTH})); }
  50%, 70% { transform: translateX(calc(-2 * ${MOBILE_POSTER_WIDTH})); }
  75%, 95% { transform: translateX(calc(-3 * ${MOBILE_POSTER_WIDTH})); }
  100% { transform: translateX(calc(-4 * ${MOBILE_POSTER_WIDTH})); }
`;

const PosterGrid = styled.div`
  display: flex;
  overflow: hidden;
  width: ${MOBILE_POSTER_WIDTH};
  aspect-ratio: 1 / 1.414;
  position: relative;
  margin-bottom: 20px;
`;

const SlideTrack = styled.div`
  display: flex;
  gap: 0px;
  width: max-content;
  animation: ${slide} 15s ease-in-out infinite;
`;

const PosterImage = styled.img`
  width: ${MOBILE_POSTER_WIDTH};
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  font-size: 2rem;
  gap: 0.8rem 20px;
  align-items: start;
`;

const InfoLabel = styled.span`
  font-weight: 800;
  color: #000;
`;

const InfoValue = styled.span`
  font-weight: 600;
  color: #000;
  line-height: 1.4;
`;

const IntroSectionMobile = () => {
  const posters = [Poster1, Poster2, Poster3, Poster4];

  return (
    <AboutSection>
      <ContentContainer>
        <TitleContainer>
          <TextBox fontSize="1.8rem" textAlign="center" rotate={0} width="100%">
            {introData.title}
          </TextBox>
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

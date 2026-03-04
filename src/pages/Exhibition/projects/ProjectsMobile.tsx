import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextBox from '../../../components/common/TextBox';
import { projectDetailData } from '../data/ProjectDetailData';
import Footer from '../../../components/common/Footer';

const ProjectsWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 100px 24px 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
  z-index: 0;
  overflow: hidden;
`;

const ClubLogo = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 0vw;
  width: 100vw;

  img {
    width: 100%;
    height: auto;

    opacity: 1;
    mix-blend-mode: soft-light;

    transform: rotate(-30deg);
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
`;

const ClubName = styled.div`
  width: 100%;
  font-size: 3rem;
  font-weight: 800;
  display: flex;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
`;

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PosterImage = styled.img`
  width: 100%;
`;

const PosterVideo = styled.video`
  width: 100%;
  outline: none;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

const ExhibitionTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 800;
  padding: 1px 0;

  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
`;

const DescriptionText = styled.p`
  & > p {
    margin-bottom: 24px;
    word-break: keep-all;
  }
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
  gap: 40px;
  margin-bottom: 15px;
  word-spacing: 0.5rem;
`;

const ProjectsMobile = () => {
  const location = useLocation();
  const [activeClub, setActiveClub] = useState('greenbee');

  useEffect(() => {
    if (location.state?.selectedClub) {
      setActiveClub(location.state.selectedClub);
    }
  }, [location.state]);

  const currentData =
    projectDetailData[activeClub] || projectDetailData['greenbee'];

  return (
    <>
      <BackgroundLayer>
        <ClubLogo>
          <img src={currentData.logoUrl} alt={`${activeClub} Logo`} />
        </ClubLogo>
      </BackgroundLayer>

      <ProjectsWrapper>
        <ContentContainer>
          <ClubName>{currentData.clubName}</ClubName>
          <PosterContainer>
            {activeClub === 'hyphen' && currentData.videoUrl ? (
              <PosterVideo
                src={currentData.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <PosterImage
                src={currentData.posterUrl}
                alt="Exhibition Poster"
              />
            )}
          </PosterContainer>
          <InfoSection>
            <TextBox fontSize="2rem" paddingType="wide" fontWeight={600}>
              {currentData.introduction}
            </TextBox>

            <div>
              <ExhibitionTitle>{currentData.exhibitionTitle}</ExhibitionTitle>
              <DescriptionText>
                {currentData.description
                  .split('\n')
                  .map((line: string, index: number) => (
                    <p key={index}>{line}</p>
                  ))}
              </DescriptionText>
              <div>
                <ParticipantsGrid>
                  <p style={{ fontWeight: '800' }}>아트디렉터</p>
                  <p>{currentData.directors.join(' ')}</p>
                </ParticipantsGrid>
                <ParticipantsGrid>
                  <p style={{ fontWeight: '800' }}>참여자</p>
                  <p>{currentData.participants.join(' ')}</p>
                </ParticipantsGrid>
              </div>
            </div>
          </InfoSection>
        </ContentContainer>
        <Footer />
      </ProjectsWrapper>
    </>
  );
};

export default ProjectsMobile;

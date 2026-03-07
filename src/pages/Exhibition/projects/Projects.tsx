import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextBox from '../../../components/common/TextBox';
import { projectDetailData } from '../data/ProjectDetailData';
import Footer from '../../../components/common/Footer';
import ClubTabMenu from '../components/ClubTabMenu';

const ProjectsWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 120px 36px 0 36px;

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
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
  z-index: 0;
  overflow: hidden;
`;

const ClubLogo = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  width: 40vw;

  img {
    width: 100%;
    height: auto;

    opacity: 1;
    mix-blend-mode: soft-light;

    transform: rotate(-30deg);
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  height: 70vh;
`;

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
`;

const PosterImage = styled.img<{ $isLandscape: boolean }>`
  width: ${({ $isLandscape }) => ($isLandscape ? '90%' : 'auto')};
  height: ${({ $isLandscape }) => ($isLandscape ? 'auto' : '100%')};
`;

const PosterVideo = styled.video`
  width: auto;
  height: 100%;
  outline: none;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 65vh;
  overflow-y: scroll;
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

  & > p:last-child {
    margin-bottom: 70px;
  }
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
  gap: 40px;
  margin-bottom: 15px;
  word-spacing: 0.5rem;
`;

const Projects = () => {
  const location = useLocation();
  const [activeClub, setActiveClub] = useState('greenbee');

  useEffect(() => {
    if (location.state?.selectedClub) {
      setActiveClub(location.state.selectedClub);
    }
  }, [location.state]);

  const [isLandscape, setIsLandscape] = useState(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setIsLandscape(naturalWidth > naturalHeight);
  };

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
        <ClubTabMenu activeClub={activeClub} onSelectClub={setActiveClub} />
        <ContentContainer>
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
                $isLandscape={isLandscape}
                onLoad={handleImageLoad}
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

export default Projects;

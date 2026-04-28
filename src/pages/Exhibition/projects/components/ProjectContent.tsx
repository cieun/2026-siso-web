import { useState } from 'react';
import styled from 'styled-components';
import TextBox from '../../../../components/common/TextBox';
import { projectDetailData } from '../../data/ProjectDetailData';

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  min-height: 80vh;
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

interface ProjectsContentProps {
  activeClub: string;
}

const ProjectsContent = ({ activeClub }: ProjectsContentProps) => {
  const [isLandscape, setIsLandscape] = useState(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setIsLandscape(naturalWidth > naturalHeight);
  };

  const currentData =
    projectDetailData[activeClub] || projectDetailData['greenbee'];

  return (
    <>
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
    </>
  );
};

export default ProjectsContent;

import styled from 'styled-components';
import TextBox from '../../../../../components/common/TextBox';
import { projectDetailData } from '../../../data/ProjectDetailData';

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 20px;
  width: 100%;
`;

const ClubName = styled.div`
  display: flex;
  width: 100%;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  font-size: 3rem;
  font-weight: 800;
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
  margin-bottom: 20px;
  padding: 1px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  font-size: 2rem;
  font-weight: 800;
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

const ProjectsContentMobile = ({ activeClub }: ProjectsContentProps) => {
  const currentData =
    projectDetailData[activeClub] || projectDetailData['greenbee'];

  return (
    <>
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
            <PosterImage src={currentData.posterUrl} alt="Exhibition Poster" />
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

export default ProjectsContentMobile;

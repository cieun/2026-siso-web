import styled from 'styled-components';
import TextBox from '../../../../../components/common/TextBox';
import { IoLink } from 'react-icons/io5';

const SUPABASE_URL =
  'https://qlxpkabuqlhllqtcczhl.supabase.co/storage/v1/object/public/projects/';

interface ProjectData {
  id?: number;
  author: string;
  title: string;
  desc: string;
  imgName: string;
  instaId?: string;
  webLink?: string;
  videoLink?: string;
  club: string;
}

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
  activeClub: string;
}

const DetailContainer = styled.div`
  display: flex;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 50px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.div<{ $isMultiAuthor?: boolean }>`
  display: flex;
  flex-direction: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'column' : 'row'};
  justify-content: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'flex-start' : 'space-between'};
  align-items: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'flex-start' : 'center'};
  gap: ${({ $isMultiAuthor }) => ($isMultiAuthor ? '8px' : '0')};
  margin-bottom: 40px;
  font-size: 2rem;

  .insta-id {
    font-weight: 800;
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column; // 💡 이미지를 세로로 정렬
  gap: 20px; // 💡 이미지 사이의 간격 (원하시는 만큼 조절하세요)
  width: 100%;
  margin-bottom: 40px;
`;

const WorkImage = styled.img`
  width: 100%;
`;

const Description = styled.p`
  line-height: 1.6;
  font-weight: 600;
  margin-bottom: 40px;
  word-break: keep-all;
  white-space: pre-wrap;

  small {
    font-size: 1.4rem;
    vertical-align: super;
    line-height: 0;
    position: relative;
    top: 2px;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const LinkItem = styled.a`
  font-size: 2rem;
  font-weight: 600;
  color: #6c6c6c;
  cursor: pointer;

  display: inline-flex;
  align-items: center;

  svg {
    transform: translateY(2px);
  }

  &:hover {
    color: #fff;
  }
`;

const ProjectDetailMobile = ({ project, activeClub }: ProjectDetailProps) => {
  //팀 참가자 관리
  const checkMultiAuthor = (authorStr: string) => {
    if (!authorStr) return false;
    const names = authorStr
      .split(/[,&]+/)
      .map((name) => name.trim())
      .filter((name) => name !== '');
    return names.length >= 2;
  };
  const isMultiAuthor = checkMultiAuthor(project.author);

  // 이미지 목록 관리
  const allImages =
    typeof project.imgName === 'string'
      ? project.imgName.trim().split(/[\n,]+/)
      : [];
  const filteredImages = allImages.filter(
    (img) => !img.toLowerCase().includes('thumbnail'),
  );
  const imageList = filteredImages.length > 0 ? filteredImages : allImages;

  return (
    <DetailContainer>
      <InfoSection>
        <InfoHeader $isMultiAuthor={isMultiAuthor}>
          <TextBox fontSize="2.5rem" paddingType="narrow" fontWeight={800}>
            {project.author}
          </TextBox>
          {project.instaId && (
            <div className="insta-id">
              {project.instaId
                .split(/[,&]+/)
                .map((id) => id.trim())
                .filter((id) => id !== '')
                .map((id, index) => (
                  <span key={index} style={{ marginRight: '10px' }}>
                    @{id}
                  </span>
                ))}
            </div>
          )}
        </InfoHeader>

        <Title>{project.title}</Title>

        {imageList.length > 0 && imageList[0] !== '' && (
          <ImageSection>
            {imageList.map((imgName, index) => (
              <WorkImage
                key={index}
                src={`${SUPABASE_URL}${activeClub}/${imgName.trim()}`}
                alt={`${project.title} - ${index + 1}`}
                loading="lazy" // 💡 이미지가 많을 수 있으니 지연 로딩 추가
              />
            ))}
          </ImageSection>
        )}

        <Description dangerouslySetInnerHTML={{ __html: project.desc }} />

        {(project.webLink || project.videoLink) && (
          <LinkSection>
            {project.webLink && (
              <LinkItem
                href={
                  project.webLink.startsWith('http')
                    ? project.webLink
                    : `https://${project.webLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLink style={{ marginRight: '10px' }} />
                Web Link
              </LinkItem>
            )}

            {project.videoLink && (
              <LinkItem
                href={
                  project.videoLink.startsWith('http')
                    ? project.videoLink
                    : `https://${project.videoLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLink style={{ marginRight: '10px' }} />
                Video Link
              </LinkItem>
            )}
          </LinkSection>
        )}
      </InfoSection>
    </DetailContainer>
  );
};

export default ProjectDetailMobile;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import TextBox from '../../../../components/common/TextBox';
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  min-height: 80vh;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
`;

const WorkImage = styled.img<{ $isLandscape: boolean }>`
  width: ${({ $isLandscape }) => ($isLandscape ? '90%' : 'auto')};
  height: ${({ $isLandscape }) => ($isLandscape ? 'auto' : '100%')};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InfoHeader = styled.div<{ $isMultiAuthor?: boolean }>`
  display: flex;
  flex-direction: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'column' : 'row'};
  justify-content: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'flex-start' : 'space-between'};
  align-items: ${({ $isMultiAuthor }) =>
    $isMultiAuthor ? 'flex-start' : 'center'};
  gap: ${({ $isMultiAuthor }) => ($isMultiAuthor ? '10px' : '0')};
  margin-bottom: 30px;
  font-size: 2rem;

  .insta-id {
    font-weight: 800;
    text-align: left;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  font-size: 2rem;
`;

const Description = styled.p`
  margin-bottom: 40px;
  font-weight: 600;
  line-height: 1.6;
  word-break: keep-all;
  white-space: pre-wrap;

  small {
    position: relative;
    top: 2px;
    font-size: 1.4rem;
    line-height: 0;
    vertical-align: super;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const LinkItem = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: #6c6c6c;
  cursor: pointer;

  svg {
    transform: translateY(2px);
  }

  &:hover {
    color: #fff;
  }
`;

const ThumbnailSlide = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 20px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailOverlay = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(255, 255, 255, 0.6)' : 'transparent'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const ProjectDetail = ({ project, activeClub }: ProjectDetailProps) => {
  //가로세로형 이미지 관리
  const [isLandscape, setIsLandscape] = useState(false);
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setIsLandscape(naturalWidth > naturalHeight);
  };

  //팀 참가자 관리
  const checkMultiAuthor = (authorStr: string) => {
    if (!authorStr) return false;
    const names = authorStr
      .split(/[,&]+/)
      .map((name) => name.trim())
      .filter((name) => name !== '');
    return names.length >= 4;
  };
  const isMultiAuthor = checkMultiAuthor(project.author);

  //이미지 목록 관리
  const allImages =
    typeof project.imgName === 'string'
      ? project.imgName.trim().split(/[\n,]+/)
      : [];
  const filteredImages = allImages.filter(
    (img) => !img.toLowerCase().includes('thumbnail'),
  );
  const imageList = filteredImages.length > 0 ? filteredImages : allImages;
  const [selectedImage, setSelectedImage] = useState(imageList[0] || '');
  useEffect(() => {
    if (imageList.length > 0 && imageList[0] !== '') {
      setSelectedImage(imageList[0]);
    } else {
      setSelectedImage('');
    }
  }, [project, imageList[0]]);

  return (
    <DetailContainer>
      <ImageSection>
        {selectedImage && selectedImage.trim() !== '' ? (
          <WorkImage
            src={`${SUPABASE_URL}${activeClub}/${selectedImage.trim()}`}
            alt={project.title}
            $isLandscape={isLandscape}
            onLoad={handleImageLoad}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
        )}
      </ImageSection>

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

        {imageList.length > 0 && (
          <ThumbnailSlide>
            {imageList.map((imgName, index) => {
              const isActive = selectedImage === imgName;
              return (
                <ThumbnailWrapper
                  key={index}
                  onClick={() => setSelectedImage(imgName)}
                >
                  <img
                    src={`${SUPABASE_URL}${activeClub}/${imgName.trim()}`}
                    alt={`Preview ${index + 1}`}
                  />
                  <ThumbnailOverlay $isActive={isActive} />
                </ThumbnailWrapper>
              );
            })}
          </ThumbnailSlide>
        )}
      </InfoSection>
    </DetailContainer>
  );
};

export default ProjectDetail;

import styled from 'styled-components';
import Footer from '../../components/common/Footer';
import TextBox from '../../components/common/TextBox';
import {
  ARCHIVE_SCENE_IMAGES,
  ARCHIVE_GOODS_IMAGES,
  ARCHIVE_CLUB_IMAGES,
} from './data/archiveData';

const SUPABASE_URL =
  'https://qlxpkabuqlhllqtcczhl.supabase.co/storage/v1/object/public/projects/archive/';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.sportyPink} 0%, ${theme.colors.background} 100%)`};

  overflow-x: hidden;

  padding: 0 24px;
`;

const ArchiveContent = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 100px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArchiveColumn = styled.div`
  flex: 1;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
  width: 100%;
`;

const ArchiveImage = styled.img`
  width: 100%;
  height: auto;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000;
  align-self: stretch;
  margin: 36px 0 18px 0;
`;

const Archive = () => {
  return (
    <PageWrapper>
      <ArchiveContent>
        <ArchiveColumn>
          <TextBox textAlign="center" fontSize="2rem" paddingType="narrow">
            전경 사진
          </TextBox>
          <ImageList>
            {ARCHIVE_SCENE_IMAGES.map((img, index) => (
              <ArchiveImage
                key={`scene-${index}`}
                src={`${SUPABASE_URL}${img}`}
                alt={`전경 사진 ${index + 1}`}
                loading="lazy"
              />
            ))}
          </ImageList>
        </ArchiveColumn>
        <HorizontalLine></HorizontalLine>
        <ArchiveColumn>
          <TextBox textAlign="center" fontSize="2rem" paddingType="narrow">
            굿즈 사진
          </TextBox>
          <ImageList>
            {ARCHIVE_GOODS_IMAGES.map((img, index) => (
              <ArchiveImage
                key={`goods-${index}`}
                src={`${SUPABASE_URL}${img}`}
                alt={`굿즈 사진 ${index + 1}`}
                loading="lazy"
              />
            ))}
          </ImageList>
        </ArchiveColumn>
        <HorizontalLine></HorizontalLine>
        <ArchiveColumn>
          <TextBox textAlign="center" fontSize="2rem" paddingType="narrow">
            소모임별 사진
          </TextBox>
          <ImageList>
            {ARCHIVE_CLUB_IMAGES.map((img, index) => (
              <ArchiveImage
                key={`club-${index}`}
                src={`${SUPABASE_URL}${img}`}
                alt={`소모임 사진 ${index + 1}`}
                loading="lazy"
              />
            ))}
          </ImageList>
        </ArchiveColumn>
      </ArchiveContent>
      <Footer />
    </PageWrapper>
  );
};

export default Archive;

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
  padding: 0 36px;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.sportyPink} 0%, ${theme.colors.background} 100%)`};
  overflow-x: hidden;
`;

// const ArchiveContent = styled.div`
//   width: 100%;
//   height: 80vh;
//   padding: 180px 0 0 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ReleaseMessage = styled.h1`
//   color: ${({ theme }) => theme.colors.background};
//   text-align: center;
//   font-size: 3rem;
// `;

const ArchiveContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  min-height: 80vh;
  padding: 180px 0 80px 0;
`;

const ArchiveColumn = styled.div`
  flex: 1;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  margin-top: 48px;
`;

const ArchiveImage = styled.img`
  width: 100%;
  height: auto;
`;

const VerticalLine = styled.div`
  align-self: stretch;
  width: 2px;
  margin: 0 36px;
  background-color: #000;
`;

const HorizontalLine = styled.div`
  align-self: stretch;
  width: 100%;
  height: 2px;
  margin: 36px 0;
  background-color: #000;
`;

const Archive = () => {
  return (
    <PageWrapper>
      {/* <ArchiveContent>
        <ReleaseMessage>
          4월 공개 예정 <br />
          This page will be released in April
        </ReleaseMessage>
      </ArchiveContent> */}
      <ArchiveContent>
        <ArchiveColumn>
          <TextBox textAlign="center" fontSize="2.6rem" paddingType="narrow">
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
          <HorizontalLine></HorizontalLine>
          <TextBox textAlign="center" fontSize="2.6rem" paddingType="narrow">
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
        <VerticalLine></VerticalLine>
        <ArchiveColumn>
          <TextBox textAlign="center" fontSize="2.6rem" paddingType="narrow">
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

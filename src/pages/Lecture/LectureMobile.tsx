import { useState } from 'react';
import styled from 'styled-components';
import TimeTableMobile from './components/mobile/TimeTableMobile';
import LectureListMobile from './components/mobile/LectureListMobile';
import Footer from '../../components/common/Footer';

const PageWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.lasPalmas} 0%, ${theme.colors.background} 100%)`};
  padding: 100px 24px 24px 24px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

const LectureContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 20px;
`;

const LectureMobile = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleSelectLecture = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <PageWrapper>
      <LectureContainer>
        <TimeTableMobile onSelectLecture={handleSelectLecture} />
        <LectureListMobile openId={openId} setOpenId={setOpenId} />
      </LectureContainer>
      <Footer />
    </PageWrapper>
  );
};

export default LectureMobile;

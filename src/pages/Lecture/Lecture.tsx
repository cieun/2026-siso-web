import { useState } from 'react';
import styled from 'styled-components';
import TimeTable from './components/TimeTable';
import LectureList from './components/LectureList';
import Footer from '../../components/common/Footer';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.lasPalmas} 0%, ${theme.colors.background} 100%)`};
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LectureContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 180px 0 0 0;
  height: 850px;
`;

const Lecture = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleSelectLecture = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <PageWrapper>
      <LectureContainer>
        <TimeTable onSelectLecture={handleSelectLecture} />
        <LectureList openId={openId} setOpenId={setOpenId} />
      </LectureContainer>
      <Footer />
    </PageWrapper>
  );
};

export default Lecture;

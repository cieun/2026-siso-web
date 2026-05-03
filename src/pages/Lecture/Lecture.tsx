import styled from 'styled-components';
import { useState } from 'react';
import Footer from '../../components/common/Footer';
import LectureList from './components/LectureList';
import TimeTable from './components/TimeTable';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  padding: 0 36px;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.lasPalmas} 0%, ${theme.colors.background} 100%)`};
`;

const LectureContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 850px;
  padding: 180px 0 0 0;
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

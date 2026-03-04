import { useEffect } from 'react';
import styled from 'styled-components';
import { lectureData } from '../data/LectureData';
import TextBox from '../../../components/common/TextBox';

const ListWrapper = styled.div`
  height: 68vh;
  overflow-y: scroll;
`;

const RowMain = styled.div`
  display: flex;
  align-items: center;
  padding: 2.2vh 0 2.23vh 0;
  font-weight: 800;
  gap: 20px;
  font-size: 1.8rem;
`;

const LectureRow = styled.div`
  border-bottom: 2px solid #000;
  cursor: pointer;
  overflow: hidden;

  &:first-child ${RowMain} {
    border-top: 2px solid #000;
  }
`;

const DescriptionArea = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: all 0.4s ease-in-out;
  padding: ${({ $isOpen }) => ($isOpen ? '0 0 20px 50px' : '0 0 0 50px')};
  font-weight: 600;
  word-break: keep-all;
  font-size: 1.6rem;
`;

const LectureTitle = styled.div`
  margin-bottom: 10px;
`;

interface LectureListProps {
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

const LectureList = ({ openId, setOpenId }: LectureListProps) => {
  useEffect(() => {
    if (openId !== null) {
      const target = document.getElementById(`lecture-${openId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [openId]);

  return (
    <ListWrapper>
      {lectureData.lectures.map((lecture) => (
        <LectureRow
          id={`lecture-${lecture.id}`}
          key={lecture.id}
          onClick={() => setOpenId(openId === lecture.id ? null : lecture.id)}
        >
          <RowMain>
            <TextBox fontSize="1.6rem" paddingType="narrow">
              {lecture.id}
            </TextBox>
            <span style={{ flex: 3 }}>{lecture.lecturer}</span>
            <span style={{ flex: 1 }}>{lecture.date}</span>
            <span style={{ flex: 1 }}>{lecture.time}</span>
            <span style={{ flex: 1 }}>{lecture.place}</span>
          </RowMain>
          <DescriptionArea $isOpen={openId === lecture.id}>
            <LectureTitle>⟪{lecture.title}⟫</LectureTitle>
            {lecture.description}
          </DescriptionArea>
        </LectureRow>
      ))}
    </ListWrapper>
  );
};

export default LectureList;

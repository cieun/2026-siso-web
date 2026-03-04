import { useEffect } from 'react';
import styled from 'styled-components';
import { lectureData } from '../../data/LectureData';
import TextBox from '../../../../components/common/TextBox';

const ListWrapper = styled.div`
  width: 100%;
`;

const RowMain = styled.div`
  display: flex;
  padding: 1.5vh 0 1.5vh 0;
  font-weight: 800;
  gap: 15px;
  font-size: 1.7rem;
  width: 100%;
`;

const LectureRow = styled.div`
  border-bottom: 2px solid #000;
  cursor: pointer;
  overflow: hidden;
  width: 100%;

  &:first-child ${RowMain} {
    border-top: 2px solid #000;
  }
`;

const RowTitle = styled.div`
  width: 100%;
`;

const Lecturer = styled.div`
  margin-bottom: 5px;
`;

const LectureInfo = styled.div`
  width: 100%;
  font-size: 1.5rem;

  span {
    margin-right: 15px;
  }
`;

const DescriptionArea = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: all 0.4s ease-in-out;
  padding: ${({ $isOpen }) => ($isOpen ? '0 0 20px 35px' : '0 0 0 35px')};
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

const LectureListMobile = ({ openId, setOpenId }: LectureListProps) => {
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
            <TextBox fontSize="1.8rem" paddingType="narrow">
              {lecture.id}
            </TextBox>
            <RowTitle>
              <Lecturer>
                <span>{lecture.lecturer}</span>
              </Lecturer>
              <LectureInfo>
                <span style={{ flex: 1 }}>{lecture.date}</span>
                <span style={{ flex: 1 }}>{lecture.time}</span>
                <span style={{ flex: 1 }}>{lecture.place}</span>
              </LectureInfo>
            </RowTitle>
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

export default LectureListMobile;

import styled from 'styled-components';
import { useEffect } from 'react';
import TextBox from '../../../../components/common/TextBox';
import { lectureData } from '../../data/LectureData';

const ListWrapper = styled.div`
  width: 100%;
`;

const RowMain = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  padding: 1.5vh 0 1.5vh 0;
  font-size: 1.7rem;
  font-weight: 800;
`;

const LectureRow = styled.div`
  width: 100%;
  border-bottom: 2px solid #000;
  overflow: hidden;
  cursor: pointer;

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
  padding: ${({ $isOpen }) => ($isOpen ? '0 0 20px 35px' : '0 0 0 35px')};
  font-size: 1.6rem;
  font-weight: 600;
  word-break: keep-all;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: all 0.4s ease-in-out;
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

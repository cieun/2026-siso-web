import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TextBox from '../../components/common/TextBox';
import { exhibitionData } from './data/ExhibitionData';
import Footer from '../../components/common/Footer';

const ExhibitionWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};

  position: relative;
  overflow-x: hidden;
  padding: 0 36px;
`;
const ObjectSection = styled.div`
  width: 100%;
  height: 240vh;
  position: relative;
  margin-top: 180px;
`;

const ObjectContainer = styled.div<{
  $top: string;
  $left: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  cursor: pointer;
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
`;

const ObjectSVG = styled.img<{ $width: string }>`
  width: ${({ $width }) => $width};
  display: block;
  height: auto;
`;

const LabelAnchor = styled.div<{
  $pos: { top: string; left: string; rotate: number };
}>`
  position: absolute;
  top: ${({ $pos }) => $pos.top};
  left: ${({ $pos }) => $pos.left};
  transform: rotate(${({ $pos }) => $pos.rotate}deg);
  white-space: nowrap;
  z-index: 10;
`;

const Exhibition = () => {
  const navigate = useNavigate();

  const handleObjectClick = (id: string) => {
    navigate('/exhibition/projects', { state: { selectedClub: id } });
  };

  return (
    <ExhibitionWrapper>
      <ObjectSection>
        {exhibitionData.map((obj) => (
          <ObjectContainer
            key={obj.id}
            $top={obj.top}
            $left={obj.left}
            onClick={() => handleObjectClick(obj.id)}
          >
            <ObjectSVG src={obj.svg} alt={obj.name} $width={obj.width} />

            <LabelAnchor $pos={obj.namePos}>
              <TextBox fontSize="3.6rem" paddingType="narrow">
                {obj.name}
              </TextBox>
            </LabelAnchor>

            <LabelAnchor $pos={obj.fieldPos}>
              <TextBox
                fontSize="1.8rem"
                textAlign="center"
                paddingType="narrow"
              >
                {`${obj.fieldKo}\n${obj.fieldEn}`}
              </TextBox>
            </LabelAnchor>
          </ObjectContainer>
        ))}
      </ObjectSection>
      <Footer />
    </ExhibitionWrapper>
  );
};

export default Exhibition;

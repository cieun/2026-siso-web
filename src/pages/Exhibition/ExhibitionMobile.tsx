import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TextBox from '../../components/common/TextBox';
import { exhibitionData } from './data/ExhibitionData';
import Footer from '../../components/common/Footer';

const ExhibitionWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};

  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding: 0 24px;
`;
const ObjectSection = styled.div`
  width: 100%;
  position: relative;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  margin-bottom: 60px;
`;

const ObjectContainer = styled.div<{
  $top: string;
  $left: string;
}>`
  position: relative;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
`;

const ObjectSVG = styled.img<{ $mobileWidth: string }>`
  width: ${({ $mobileWidth }) => $mobileWidth};
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

const ExhibitionMobile = () => {
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
            <ObjectSVG
              src={obj.svg}
              alt={obj.name}
              $mobileWidth={obj.mobileWidth}
            />

            <LabelAnchor $pos={obj.namePosMobile}>
              <TextBox fontSize="3rem" paddingType="narrow">
                {obj.name}
              </TextBox>
            </LabelAnchor>

            <LabelAnchor $pos={obj.fieldPosMobile}>
              <TextBox
                fontSize="1.4rem"
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

export default ExhibitionMobile;

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import { exhibitionData } from './data/ExhibitionData';

const ExhibitionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0 36px;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
  overflow-x: hidden;
`;
const ObjectSection = styled.div`
  position: relative;
  width: 100%;
  height: 240vh;
  margin-top: 180px;
`;

const ObjectContainer = styled.div<{
  $top: string;
  $left: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transition: filter 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
`;

const ObjectSVG = styled.img<{ $width: string }>`
  width: ${({ $width }) => $width};
  display: block;
  height: auto;
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
          </ObjectContainer>
        ))}
      </ObjectSection>
      <Footer />
    </ExhibitionWrapper>
  );
};

export default Exhibition;

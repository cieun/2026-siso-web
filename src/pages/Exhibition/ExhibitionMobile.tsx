import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import { exhibitionData } from './data/ExhibitionData';

const ExhibitionWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  padding: 0 24px;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ObjectSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  position: relative;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 60px;
`;

const ObjectContainer = styled.div<{
  $top: string;
  $left: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: filter 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
`;

const ObjectSVG = styled.img<{ $mobileWidth: string }>`
  display: block;
  width: ${({ $mobileWidth }) => $mobileWidth};
  height: auto;
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
          </ObjectContainer>
        ))}
      </ObjectSection>
      <Footer />
    </ExhibitionWrapper>
  );
};

export default ExhibitionMobile;

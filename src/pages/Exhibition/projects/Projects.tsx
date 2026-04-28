import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectContent from './components/ProjectContent';
import ProjectDetail from './components/ProjectDetail';
import ProjectGrid from './components/ProjectGrid';
import { projectDetailData } from '../data/ProjectDetailData';
import Footer from '../../../components/common/Footer';
import ClubTabMenu from '../components/ClubTabMenu';

const ProjectsWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 36px 0 36px;

  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
  z-index: 0;
  overflow: hidden;
`;

const ClubLogo = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  width: 40vw;

  img {
    width: 100%;
    height: auto;

    opacity: 1;
    mix-blend-mode: soft-light;

    transform: rotate(-30deg);
  }
`;

const Projects = () => {
  const location = useLocation();

  const [activeClub, setActiveClub] = useState(
    location.state?.selectedClub || 'greenbee',
  );
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (location.state?.selectedClub) {
      setActiveClub(location.state.selectedClub);
      setSelectedProject(null);
    }
  }, [location.state]);

  const currentData =
    projectDetailData[activeClub] || projectDetailData['greenbee'];

  return (
    <>
      <BackgroundLayer>
        <ClubLogo>
          <img src={currentData.logoUrl} alt={`${activeClub} Logo`} />
        </ClubLogo>
      </BackgroundLayer>

      <ProjectsWrapper>
        <ClubTabMenu
          activeClub={activeClub}
          onSelectClub={(club) => {
            setActiveClub(club);
            setSelectedProject(null);
          }}
        />
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            activeClub={activeClub}
          />
        ) : (
          <ProjectContent activeClub={activeClub} />
        )}

        <ProjectGrid
          activeClub={activeClub}
          onProjectClick={setSelectedProject}
          selectedProject={selectedProject}
        />

        <Footer />
      </ProjectsWrapper>
    </>
  );
};

export default Projects;

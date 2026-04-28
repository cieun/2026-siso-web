import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectContentMobile from './components/mobile/ProjectContentMobile';
import ProjectDetailMobile from './components/mobile/ProjectDetailMobile';
import ProjectGridMobile from './components/mobile/ProjectGridMobile';
import { projectDetailData } from '../data/ProjectDetailData';
import Footer from '../../../components/common/Footer';

const ProjectsWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  padding: 100px 24px 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
  z-index: 0;
  overflow: hidden;
`;

const ClubLogo = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 0vw;
  width: 100vw;

  img {
    width: 100%;
    height: auto;

    opacity: 1;
    mix-blend-mode: soft-light;

    transform: rotate(-30deg);
  }
`;

const ProjectsMobile = () => {
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
        {selectedProject ? (
          <ProjectDetailMobile
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            activeClub={activeClub}
          />
        ) : (
          <ProjectContentMobile activeClub={activeClub} />
        )}

        <ProjectGridMobile
          activeClub={activeClub}
          onProjectClick={setSelectedProject}
          selectedProject={selectedProject}
        />
        <Footer />
      </ProjectsWrapper>
    </>
  );
};

export default ProjectsMobile;

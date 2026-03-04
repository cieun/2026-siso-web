import { useMediaQuery } from 'react-responsive';
import ProjectsDesktop from './Projects';
import ProjectsMobile from './ProjectsMobile';

const Projects = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <ProjectsMobile /> : <ProjectsDesktop />;
};

export default Projects;

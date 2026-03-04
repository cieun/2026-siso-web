import { useMediaQuery } from 'react-responsive';
import AboutDesktop from './About';
import AboutMobile from './AboutMobile';

const About = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <AboutMobile /> : <AboutDesktop />;
};

export default About;

import { useMediaQuery } from 'react-responsive';
import ExhibitionDesktop from './Exhibition';
import ExhibitionMobile from './ExhibitionMobile';

const Exhibition = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <ExhibitionMobile /> : <ExhibitionDesktop />;
};

export default Exhibition;

import { useMediaQuery } from 'react-responsive';
import MainDesktop from './Main';
import MainMobile from './MainMobile';

const Main = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <MainMobile /> : <MainDesktop />;
};

export default Main;

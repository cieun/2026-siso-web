import { useMediaQuery } from 'react-responsive';
import ArchiveDesktop from './Archive';
import ArchiveMobile from './ArchiveMobile';

const Archive = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <ArchiveMobile /> : <ArchiveDesktop />;
};

export default Archive;

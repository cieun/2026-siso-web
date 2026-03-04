import { useMediaQuery } from 'react-responsive';
import LectureDesktop from './Lecture';
import LectureMobile from './LectureMobile';

const Lecture = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <LectureMobile /> : <LectureDesktop />;
};

export default Lecture;

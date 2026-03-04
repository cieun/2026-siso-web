import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import QuickNav from './components/common/QuickNav';

import MobileHeader from './components/mobile/MobileHeader';

import Main from './pages/Main';
import About from './pages/About';
import Lecture from './pages/Lecture';
import Exhibition from './pages/Exhibition';
import Projects from './pages/Exhibition/projects';
import Archive from './pages/Archive';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      {isMobile ? <MobileHeader /> : <Header />}
      <QuickNav />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/lecture" element={<Lecture />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/exhibition/projects" element={<Projects />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

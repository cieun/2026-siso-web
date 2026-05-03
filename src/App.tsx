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

const IS_OPEN = true;

const ComingSoon = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100dvh',
      padding: '36px',
      fontWeight: 800,
      color: '#000000',
      background: '#ffffff',
    }}
  >
    <h1
      style={{
        marginBottom: '1rem',
        fontSize: '2.5rem',
        lineHeight: '1.4',
        textAlign: 'center',
      }}
    >
      2026 홍익대학교 시각디자인과 소모임 축제주간 : SISO
      <br />
      2026 Hongik University Visual Communication Design Club Festival Week :
      SISO
    </h1>
    <p style={{ marginTop: '3rem', fontSize: '2.2rem', fontWeight: '800' }}>
      2026.03.09 09:00 KST
    </p>
  </div>
);

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!IS_OPEN) {
    return <ComingSoon />;
  }

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

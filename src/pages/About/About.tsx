import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroSection from './components/IntroSection';
import VisitorGuideSection from './components/VisitorGuideSection';
import GoodsSection from './components/GoodsSection';
import EventSection from './components/EventSection';
import CommitteeSection from './components/CommitteeSection';

const PageWrapper = styled.div<{ $isWhiteBg: boolean }>`
  width: 100%;
  height: 100vh;
  position: relative;
  scroll-snap-type: y mandatory;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.background};

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(180deg, ${theme.colors.digitalYellow} 0%, ${theme.colors.background} 100%)`};
    z-index: 0;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(180deg, ${theme.colors.digitalYellow} 0%, ${theme.colors.background} 20%)`};

    opacity: ${({ $isWhiteBg }) => ($isWhiteBg ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    z-index: 1;
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const About = () => {
  const [isWhiteBg, setIsWhiteBg] = useState(false);
  const committeeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWhiteBg(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      },
    );

    if (committeeRef.current) {
      observer.observe(committeeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <PageWrapper $isWhiteBg={isWhiteBg}>
      <IntroSection />
      <VisitorGuideSection />
      <GoodsSection />
      <EventSection />
      <div ref={committeeRef} style={{ scrollSnapAlign: 'start' }}>
        <CommitteeSection />
      </div>
    </PageWrapper>
  );
};

export default About;

import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import IntroSection from './components/IntroSection';
import VisitorGuideSection from './components/VisitorGuideSection';
import GoodsSection from './components/GoodsSection';
import EventSection from './components/EventSection';
import CommitteeSection from './components/CommitteeSection';

const PageWrapper = styled.div<{ $isWhiteBg: boolean }>`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  scroll-snap-type: y mandatory;

  &::after {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(180deg, ${theme.colors.digitalYellow} 0%, ${theme.colors.background} 100%)`};
    pointer-events: none;
    content: '';
  }

  &::before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(180deg, ${theme.colors.digitalYellow} 0%, ${theme.colors.background} 20%)`};

    opacity: ${({ $isWhiteBg }) => ($isWhiteBg ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    pointer-events: none;
    content: '';
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

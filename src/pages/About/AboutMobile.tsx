import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroSectionMobile from './components/mobile/IntroSectionMobile';
import VisitorGuideSectionMobile from './components/mobile/VisitorGuideSectionMobile';
import GoodsSectionMobile from './components/mobile/GoodsSectionMobile';
import EventSectionMobile from './components/mobile/EventSectionMobile';
import CommitteeSectionMobile from './components/mobile/CommitteeSectionMobile';

const PageWrapper = styled.div<{ $isWhiteBg: boolean }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;

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
      `linear-gradient(180deg, ${theme.colors.digitalYellow} 0%, ${theme.colors.background} 15%)`};

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

const AboutMobile = () => {
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
      <IntroSectionMobile />
      <VisitorGuideSectionMobile />
      <GoodsSectionMobile />
      <EventSectionMobile />
      <div ref={committeeRef} style={{ scrollSnapAlign: 'start' }}>
        <CommitteeSectionMobile />
      </div>
    </PageWrapper>
  );
};

export default AboutMobile;

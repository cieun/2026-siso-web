import styled from 'styled-components';

const SectionLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
  padding: 160px 36px 36px 36px;
  box-sizing: border-box;

  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: transparent;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 60px 24px 24px 24px;
    height: auto;
    gap: 20px;
  }
`;

interface AboutSectionProps {
  children: React.ReactNode;
}

export const AboutSection = ({ children }: AboutSectionProps) => {
  return <SectionLayout>{children}</SectionLayout>;
};

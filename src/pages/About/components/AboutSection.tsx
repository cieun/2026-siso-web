import styled from 'styled-components';

const SectionLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 160px 36px 36px 36px;
  background: transparent;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    height: auto;
    padding: 60px 24px 24px 24px;
  }
`;

interface AboutSectionProps {
  children: React.ReactNode;
}

export const AboutSection = ({ children }: AboutSectionProps) => {
  return <SectionLayout>{children}</SectionLayout>;
};

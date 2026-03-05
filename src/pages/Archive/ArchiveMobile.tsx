import styled from 'styled-components';
import Footer from '../../components/common/Footer';

const PageWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.sportyPink} 0%, ${theme.colors.background} 100%)`};

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 36px;
`;

const ArchiveContent = styled.div`
  width: 100%;
  height: 80vh;
  padding: 180px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReleaseMessage = styled.h1`
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
  font-size: 2.5rem;
`;

const ArchiveMobile = () => {
  return (
    <PageWrapper>
      <ArchiveContent>
        <ReleaseMessage>
          4월 공개 예정 <br />
          This page will be released in April
        </ReleaseMessage>
      </ArchiveContent>
      <Footer />
    </PageWrapper>
  );
};

export default ArchiveMobile;

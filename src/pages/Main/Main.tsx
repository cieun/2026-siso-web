import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.redShimmer} 0%, ${theme.colors.background} 100%)`};
`;

const Main = () => {
  return <MainContainer>{/* 내용 */}</MainContainer>;
};

export default Main;

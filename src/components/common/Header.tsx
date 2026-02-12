import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoBox = styled(Link)`
  transform: rotate(-5deg);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100px;
    width: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 73px;
`;

const MenuLink = styled(Link)`
  font-family: 'GT Walsheim', sans-serif;
  font-weight: 700; /* Cn Bd 적용 */
  font-size: 58px;
  color: #000;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.newGray};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoBox to="/">
        <img src="src/assets/logo.svg" alt="See-Saw" />
      </LogoBox>
      <Nav>
        <MenuLink to="/about">About</MenuLink>
        <MenuLink to="/lecture">Lecture</MenuLink>
        <MenuLink to="/exhibition">Exhibition</MenuLink>
        <MenuLink to="/archive">Archive</MenuLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

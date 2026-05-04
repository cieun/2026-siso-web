import styled from 'styled-components';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextBox from './TextBox';

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 180px;
  padding: 0 36px;
  pointer-events: none;
`;

const LogoBox = styled(Link)`
  pointer-events: auto;
  img {
    width: auto;
    height: 70px;
    transform: rotate(-7deg);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  pointer-events: auto;
`;

const MenuLink = styled(Link)`
  font-family: 'GT Walsheim', sans-serif;
  font-size: 3.4rem;
  font-weight: 700;
  color: #000;
`;

const Header = () => {
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const menuItems = [
    { name: 'About', path: '/about' },
    { name: 'Lecture', path: '/lecture' },
    { name: 'Exhibition', path: '/exhibition' },
    { name: 'Archive', path: '/archive' },
  ];

  return (
    <HeaderContainer>
      <LogoBox to="/">
        <img src="/assets/logo.svg" alt="See-Saw" />
      </LogoBox>
      <Nav>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const isHovered = hoveredMenu === item.name;

          return (
            <MenuLink
              key={item.name}
              to={item.path}
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {isActive || isHovered ? (
                <TextBox fontSize="3.4rem" paddingType="narrow" rotate={-7}>
                  {item.name}
                </TextBox>
              ) : (
                <div
                  style={{
                    padding: '0.1em 0.57em',
                    fontFamily: "'GT Walsheim', sans-serif",
                  }}
                >
                  {item.name}
                </div>
              )}
            </MenuLink>
          );
        })}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextBox from '../common/TextBox';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.oceanWater} 0%, ${theme.colors.background} 100%)`};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1000;
`;

const CloseButton = styled.div`
  cursor: pointer;
  border: none;
  font-weight: 800;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

const NavItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 6rem;
`;

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    setHoveredMenu(null);
  }, [location.pathname]);

  const menuItems = [
    { name: 'About', path: '/about' },
    { name: 'Lecture', path: '/lecture' },
    { name: 'Exhibition', path: '/exhibition' },
    { name: 'Archive', path: '/archive' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Overlay>
      <HeaderContainer>
        <div onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
          <TextBox fontSize="2.8rem" paddingType="narrow" rotate={-7}>
            See-Saw
          </TextBox>
        </div>
        <CloseButton onClick={onClose}>
          <TextBox fontSize="2.4rem" paddingType="narrow">
            Close
          </TextBox>
        </CloseButton>
      </HeaderContainer>
      <NavList>
        {menuItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
          const isHovered = hoveredMenu === item.name;

          return (
            <NavItemWrapper
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {isActive || isHovered ? (
                <TextBox fontSize="4rem" paddingType="narrow" rotate={-5}>
                  {item.name}
                </TextBox>
              ) : (
                <div
                  style={{
                    fontSize: '4rem',
                    fontWeight: 800,
                  }}
                >
                  {item.name}
                </div>
              )}
            </NavItemWrapper>
          );
        })}
      </NavList>
    </Overlay>
  );
};

export default MobileMenu;

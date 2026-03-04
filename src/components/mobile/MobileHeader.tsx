import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';
import TextBox from '../common/TextBox';

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

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const MenuButton = styled.div`
  cursor: pointer;
  border: none;
  font-weight: 800;
`;

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <LogoWrapper onClick={() => navigate('/')}>
          <TextBox fontSize="2.8rem" paddingType="narrow" rotate={-7}>
            See-Saw
          </TextBox>
        </LogoWrapper>
        <MenuButton onClick={() => setIsMenuOpen(true)}>
          <TextBox fontSize="2.4rem" paddingType="narrow">
            Menu
          </TextBox>
        </MenuButton>
      </HeaderContainer>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default MobileHeader;

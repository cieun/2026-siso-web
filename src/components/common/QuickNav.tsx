import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';

const QuickNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: fixed;
  right: 36px;
  bottom: 36px;
  z-index: 1000;

  @media (max-width: 768px) {
    gap: 8px;
    right: 24px;
    bottom: 24px;
  }
`;

const NavCircle = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.background};
  text-decoration: none;

  img {
    width: 80%;
    height: auto;
    object-fit: contain;
  }

  svg {
    font-size: 2rem;
    color: #000;
  }

  @media (max-width: 768px) {
    width: 33px;
    height: 33px;
  }
`;

const QuickNav = () => {
  return (
    <QuickNavContainer>
      {/* 홍익대학교 시각디자인과 홈페이지 */}
      <NavCircle
        href="https://sidi.hongik.ac.kr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/hivcd_logo.jpg" alt="홍익대학교 시각디자인과" />
      </NavCircle>

      {/* 시소 인스타그램 */}
      <NavCircle
        href="https://www.instagram.com/hivcdsiso/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </NavCircle>
    </QuickNavContainer>
  );
};

export default QuickNav;

import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';

const QuickNavContainer = styled.div`
  position: fixed;
  right: 36px;
  bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 24px;
    bottom: 24px;
    gap: 8px;
  }
`;

const NavCircle = styled.a`
  width: 44px;
  height: 44px;
  // border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  img {
    width: 80%;
    height: auto;
    object-fit: contain;
  }

  svg {
    color: #000;
    font-size: 2rem;
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

      {/* 전시 인스타그램 */}
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

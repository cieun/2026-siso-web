import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 24px;
  font-weight: 800;
  background: transparent;
`;

const FooterLogo = styled.div`
  width: 40px;

  @media (max-width: 768px) {
    width: 20px;
  }
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <img src="/assets/hongsi_logo.svg" alt="홍익시디" />
      </FooterLogo>
      <FooterText>
        <h1>See-Saw</h1>
      </FooterText>
      <div></div>
    </FooterContainer>
  );
};

export default Footer;

import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  padding-bottom: 24px;
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

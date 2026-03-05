import { createGlobalStyle } from 'styled-components';
import GTWalsheimCnBd from '../assets/fonts/GT-Walsheim-Condensed-Bold.woff2';
import GTWalsheimCnMd from '../assets/fonts/GT-Walsheim-Condensed-Medium.woff2';

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/fonts-archive/AppleSDGothicNeo/AppleSDGothicNeo.css');

    @font-face {
        font-family: 'GT Walsheim';
        src: url(${GTWalsheimCnBd}) format('woff2');
        font-weight: 800;
        font-style: normal;
        unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
        font-display: swap;
    }

    @font-face {
        font-family: 'GT Walsheim';
        src: url(${GTWalsheimCnMd}) format('woff2');
        font-weight: 600;
        font-style: normal;
        unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
        font-display: swap;
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
  font-size: 10px;
  }

  @media (max-width: 768px) {
  html {
    font-size: 8px;
  }
}

  body {
   background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font-family: 'GT Walsheim', 'Apple SD Gothic Neo', sans-serif;
    -webkit-font-smoothing: antialiased;

    line-height: 1.7;
  }

  h1, h2, strong {
    font-weight: 800; 
  }

  p {
  font-size: 2rem;
    font-weight: 600;
    line-height: 1.7;
    word-break: keep-all;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  span{
      word-break: keep-all;
      }

  ul, li {
    list-style: none;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';
import GTWalsheimCnBd from '../assets/fonts/GT-Walsheim-Condensed-Bold-Trial.woff2';
import GTWalsheimCnMd from '../assets/fonts/GT-Walsheim-Condensed-Medium-Trial.woff2';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'GT Walsheim';
        src: url(${GTWalsheimCnBd}) format('woff2');
        font-weight: 700;
        font-style: normal;
        unicode-range: U+0041-005A, U+0061-007A;
    }

    @font-face {
        font-family: 'GT Walsheim';
        src: url(${GTWalsheimCnMd}) format('woff2');
        font-weight: 500;
        font-style: normal;
        unicode-range: U+0041-005A, U+0061-007A;
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
   background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font-family: 'GT Walsheim', 'Apple SD Gothic Neo', sans-serif;
    -webkit-font-smoothing: antialiased;

    line-height: 1.7;
  }

  h1, h2, strong {
    font-weight: 700; 
  }

  p, span {
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }
`;

export default GlobalStyle;

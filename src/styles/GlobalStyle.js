import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #000;
    text-decoration: none; 
    color: inherit; 
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    min-width: 1024px;  
    min-height: 768px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #000;
    text-decoration: none; 
    color: inherit; 
  }

  header {
    font-family: 'Darumadrop One';
  }

  button {
    border: none;
    padding: none;
    outline: none;
    background-color: inherit ;
    cursor: pointer;
  }

  label, p, h1, h2 {
    font-family: 'Poor Story'
  }

  li, ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    --color-text: linear-gradient(90deg,rgb(158 243 255 / 36%) 0%,rgb(255 191 214 / 35%) 53%,rgb(158 243 255 / 32%) 100%);
    --color-text-2:linear-gradient(90deg,#764fc6 0%,#984764 53%,#c64fce 100%);
    --color-background: white;
    --color-text-3:linear-gradient(90deg,#000000 0%,#ff54a9 53%,#000000 100%);
    --color-primary: rebeccapurple;
    --card-bg-color: linear-gradient(90deg,rgb(158 243 255 / 21%) 0%,rgb(255 191 214 / 21%) 53%,rgb(158 243 255 / 21%) 100%);
  }
`;

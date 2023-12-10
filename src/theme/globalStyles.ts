// globalStyles.js
import { createGlobalStyle } from "styled-components";
import typescale from "./typescale";
import spacing from "./spacing";
import color from "./color";

const GlobalStyle = createGlobalStyle`
    ${typescale}
    ${spacing}
    ${color}
    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins';
    }
`;

export default GlobalStyle;

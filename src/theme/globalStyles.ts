// globalStyles.js
import { createGlobalStyle } from "styled-components";
import typescale from "./typescale";
import spacing from "./spacing";
import color from "./color";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins';
    }
    ${typescale}
    ${spacing}
    ${color}
`;

export default GlobalStyle;

// globalStyles.js
import { createGlobalStyle } from "styled-components";
import typescale from "./typescale";
import spacing from "./spacing";
import color from "./color";
import variables from "./variables";

const GlobalStyle = createGlobalStyle`
    ${typescale}
    ${spacing}
    ${color}
    ${variables}

    *{
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins';
    }

    textarea {
        font-family: 'Poppins';

    }
    
    h1,h2,h3,h4,h5,h6,p {
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;

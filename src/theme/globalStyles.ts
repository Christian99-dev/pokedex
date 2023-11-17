// globalStyles.js
import { createGlobalStyle } from "styled-components";
import typescale from "./typescale";
import spacing from "./spacing";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    ${typescale}
    ${spacing}
`;

export default GlobalStyle;

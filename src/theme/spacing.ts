import { css } from "styled-components";
import { responsiveCSS } from "./responsive";

export default css`
  :root {
    ${responsiveCSS("--space-xxs", 8, 4, 4, 4, 4, 4)};
    ${responsiveCSS("--space-xs", 16, 8, 6, 6, 6, 6)};
    ${responsiveCSS("--space-sm", 24, 12, 8, 8, 8, 8)};
    ${responsiveCSS("--space-md", 36, 20, 12, 10, 10, 10)};
    ${responsiveCSS("--space-lg", 50, 32, 20, 16, 12, 12)};
    ${responsiveCSS("--space-xl", 80, 52, 28, 20, 16, 16)};
    ${responsiveCSS("--space-xxl", 100, 80, 44, 32, 24, 24)};
    ${responsiveCSS("--space-xxxl", 200, 160, 112, 60, 40, 40)};
  }
`;

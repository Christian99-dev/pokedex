import { css } from "styled-components";
import { responsiveCSS } from "./responsive";

export default css`
  :root {
    ${responsiveCSS("--pokemon-img-s", 100, 90, 80, 70, 60, 50)};
    ${responsiveCSS("--pokemon-img-m", 450, 300, 200, 200, 200, 200)};
    ${responsiveCSS("--pokemon-img-l", 450, 400, 350, 300, 250, 200)};
    ${responsiveCSS("--icon-big", 100, 100, 80, 60, 50, 40)};
    ${responsiveCSS("--modal-space", 100, 100, 50, 50, 50, 40)};
    ${responsiveCSS("--big-number", 100, 150, 150, 50, 50, 40)};
  }
`;

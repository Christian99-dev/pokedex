import { css } from "styled-components";

export default css`
  :root {
    --pink: #f1b2d7;
    --dark-pink: #b76fb6;
    --purple: #633c7d;
    --dark: #231d24;
    --dark-transparent:rgba(35, 29, 36, 0.5);
    --white: white;

    --type-bug: linear-gradient(90deg, #8cb330 50%, #bd9457 50%);
    --type-ice: #aee3f5;
    --type-grass: #8bbe8a;
    --type-normal: #b1b1b1;
    --type-poison: #a864c7;
    --type-rock: #c7b78b;
    --type-ghost: #7c538c;
    --type-water: #539ae2;
    --type-psychic: #f66f71;
    --type-dark: #585858;
    --type-flying: linear-gradient(90deg, #a1d5f5 50%, #b3b3b3 50%);
    --type-ground: #d9bf77;
    --type-fighting: #eb4971;
    --type-fire: #ffa756;
    --type-electric: #f2cb55;
    --type-fairy: #f4b1f4;
    --type-dragon: linear-gradient(90deg, #ff5959 50%, #003366 50%);
    --type-steel: #c3c3c3;
  }
`;

export const darkColorTypes = ["fighting", "ghost", "dragon", "dark", "poison"]
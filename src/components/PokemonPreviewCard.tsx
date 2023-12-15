import { Pokemon } from "@/context/PokemonContext";
import styled from "styled-components";
import { responsiveCSS } from "@/theme/responsive";

const PokedexPreview = ({
  pokemon,
  active,
  onClick,
}: {
  pokemon: Pokemon;
  active: boolean;
  onClick: () => void;
}) => {
  const { image, name, id } = pokemon;
  return (
    <PokedexCardWrapper className={active ? "active" : ""} onClick={onClick}>
      <img className="pokemon-img" src={image} alt={name} />
      <h1>{name}</h1>
      <h2>{id}</h2>
    </PokedexCardWrapper>
  );
};

export default PokedexPreview;

const PokedexCardWrapper = styled.div`
  display: flex;
  background-color: var(--pink);
  align-items: center;
  border-radius: 10px;
  padding-right: var(--space-lg);
  gap: var(--space-lg);
  transition: all 0.02s ease-out;
  cursor: pointer;

  h1 {
    font-size: var(--fs-4);
    font-weight: bold;
  }
  h2 {
    font-size: var(--fs-5);
    font-weight: 200;
    margin-left: auto;
  }
  img {
    ${responsiveCSS("height", 100, 90, 80, 70, 60, 50)}
  }

  &:hover, &.active {
    transition: all 0.08s ease-in;
    background-color: var(--purple);
    color: var(--pink);
  }
`;

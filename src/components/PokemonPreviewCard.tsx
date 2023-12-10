import { Pokemon } from "@/context/PokemonContext";
import styled from "styled-components";
import { responsiveCSS } from "@/theme/responsive";
type PokedexPreviewProps = {
  pokemon: Pokemon;
};

const PokedexPreview = ({ pokemon }: PokedexPreviewProps) => {
  const { image, name, id } = pokemon;
  return (
    <PokedexCardWrapper>
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
`;

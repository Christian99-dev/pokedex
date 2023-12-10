import { Pokemon } from "@/context/PokemonContext";
import styled from "styled-components";

type PokedexPreviewProps = {
  pokemon: Pokemon;
};

const PokedexPreview = ({ pokemon }: PokedexPreviewProps) => {
  const { image, name, id } = pokemon;
  return (
    <PokedexCardWrapper>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h2>{id}</h2>
    </PokedexCardWrapper>
  );
};

export default PokedexPreview;

const PokedexCardWrapper = styled.div`
  display: flex;
  height: 100px;
  background-color: var(--pink);
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding-right: var(--space-lg);
  img {
    height: 100px;
  }
`;

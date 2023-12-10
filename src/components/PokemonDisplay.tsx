import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import React from "react";
import styled from "styled-components";

const PokemonDisplay = ({
  pokemonID,
  prevButton,
  nextButton,
}: {
  pokemonID: number;
  prevButton: () => void;
  nextButton: () => void;
}) => {
  const { getPokemonById } = usePokemonContext();
  const activePokemon: Pokemon | undefined | null = getPokemonById(pokemonID);

  return (
    <PokemonDisplayWrapper>
      <img src={activePokemon?.image} alt={activePokemon?.name} />
      <div className="bottom">
        <button onClick={prevButton}>zurück</button>
        <div className="name">{activePokemon?.name}</div>
        <button onClick={nextButton}>vor</button>
      </div>
    </PokemonDisplayWrapper>
  );
};

export default PokemonDisplay;

const PokemonDisplayWrapper = styled.div`
  height: 100%;
  width: min-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    ${responsiveCSS("width", 450, 400, 350, 300, 250, 200)}
    margin: 0 auto;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .name {
      color: white;
    }
  }
`;

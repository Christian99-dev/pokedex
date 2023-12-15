import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

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
      <img
        className="pokemon-img"
        src={activePokemon?.image}
        alt={activePokemon?.name}
      />
      <div className="bottom">
        <Icon iconname="arrow_down.svg" onClick={prevButton} />
        <div className="name">{activePokemon?.name}</div>
        <Icon iconname="arrow_down.svg" onClick={nextButton} />
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

  .pokemon-img {
    ${responsiveCSS("width", 450, 400, 350, 300, 250, 200)}
    margin: 0 auto;
  }
  .bottom {
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: white;
    }
  }
`;

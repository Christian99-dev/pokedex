import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import TypeButton from "./TypeButton";

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
  function formatNumber(num: number | undefined | null) {
    let numStr = String(num);

    if (numStr.length < 3) {
      while (numStr.length < 3) {
        numStr = "0" + numStr;
      }
    }
    return "#" + numStr;
  }
  return (
    <PokemonDisplayWrapper>
      <div className="number">{formatNumber(activePokemon?.id)}</div>
      <img
        className="pokemon-img"
        src={activePokemon?.image}
        alt={activePokemon?.name}
      />
      <div className="types">
        {activePokemon?.types.map((value: string, index: number) => (
          <TypeButton typeName={value} key={index} />
        ))}
      </div>
      <div className="description">{activePokemon?.description}</div>
      <div className="bottom">
        <Icon iconname="arrow_left.svg" onClick={prevButton} />
        <div className="name">{activePokemon?.name}</div>
        <Icon iconname="arrow_right.svg" onClick={nextButton} />
      </div>
    </PokemonDisplayWrapper>
  );
};

export default PokemonDisplay;

const PokemonDisplayWrapper = styled.div`
  position: relative;
  height: 100%;
  width: min-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-md);

  .description{
    color: white;
    font-size: var(--fs-5);
    font-weight: 300;
    min-height: 75px;
  }

  .number {
    z-index: 0;
    position: absolute;
    font-size: 150px;
    color: white;
    color: var(--pink);
    opacity: 0.2;
    left: calc(var(--space-xxxl));
    top: calc(-1 * var(--space-xl));
  }

  .pokemon-img {
    z-index: 1;
    ${responsiveCSS("width", 450, 400, 350, 300, 250, 200)}
    ${responsiveCSS("height", 450, 400, 350, 300, 250, 200)}
    
    margin: 0 auto;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: var(--pink);
      font-weight: 600;
      font-size: var(--fs-1);
    }
  }
`;

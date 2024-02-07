import React, { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import styled from "styled-components";
import { device } from "@/theme/breakpoints";
import LoadingBanner from "@/components/shared/LoadingBanner";
import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import Icon from "@/components/shared/Icon";
import BattleResult from "@/components/feature/fight/BattleResult";
import PokemonBox from "@/components/feature/fight/PokemonBox";
import PokemonList from "@/components/shared/PokemonList";

const Fight = () => {
  const { isLoading, getPokemonById } = usePokemonContext();
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (isLoading || !getPokemonById) {
    return (
      <Layout>
        <LoadingBanner />
      </Layout>
    );
  }
  return (
    <Layout>
      <FightWrapper>
        <PokemonList
          className="list-left"
          state={pokemon1}
          setState={setPokemon1}
          details={false}
          scrollingQueryID="list1"
        />
        <div className="pokemon-container">
          <PokemonBox selectedPokemon={pokemon1} />
          <Icon
            iconname="vs_icon.png"
            className="vs-icon"
            onClick={() => setModalIsOpen(true)}
          />
          <PokemonBox selectedPokemon={pokemon2} />
        </div>
        <PokemonList
          className="list-right"
          state={pokemon2}
          setState={setPokemon2}
          details={false}
          scrollingQueryID="list2"
        />
      </FightWrapper>
      <BattleResult
        selectedPokemon1={pokemon1}
        selectedPokemon2={pokemon2}
        modalIsOpen={modalIsOpen}
        onCloseModal={() => setModalIsOpen(false)}
      />
    </Layout>
  );
};

const FightWrapper = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .list-left {
    padding-left: var(--space-sm);
    padding-top: var(--space-sm);
  }

  .list-right {
    padding-right: var(--space-sm);
    padding-top: var(--space-sm);
  }

  .pokemon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .vs-icon {
      max-block-size: 100px;
      transition: all 0.1s ease-out;
      animation: bounce 4s infinite, rotate 2s linear 0s 1;
      &:hover {
        transition: all 0.3s ease-in;
        scale: 1.09;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3),
          0 10px 20px rgba(255, 0, 230, 0.2);
      }
    }
  }

  @media ${device.tablet} {
    flex-direction: column;

    .pokemon-container {
      flex-direction: column;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px) rotate(10deg);
    }
    60% {
      transform: translateY(-10px) rotate(-10deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg); /* Rotate the vs-icon 360 degrees */
    }
  }
`;

export default Fight;

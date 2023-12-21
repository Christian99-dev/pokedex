import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { device } from "@/theme/breakpoints";
import LoadingBanner from "@/components/LoadingBanner";
import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import Icon from "@/components/Icon";
import BattleResult from "@/components/BattleResult";
import PokemonBox from "@/components/PokemonBox";

const Fight = () => {
  const { isLoading, getPokemonById, getAllPokemon } = usePokemonContext();
  const [showPokemonMenu1, setShowPokemonMenu1] = useState(false);
  const [showPokemonMenu2, setShowPokemonMenu2] = useState(false);
  const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | null>(
    getPokemonById(1) || null
  );
  const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | null>(
    getPokemonById(2) || null
  );
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [arrowIcon1, setArrowIcon1] = useState("arrow_down.svg");
  const [arrowIcon2, setArrowIcon2] = useState("arrow_down.svg");  
  const handlePokemonSwitch1 = (pokemonId: string) => {
    const newSelectedPokemon = getPokemonById(parseInt(pokemonId));
    if (newSelectedPokemon) {
      setSelectedPokemon1(newSelectedPokemon);
    } else {
      console.error("Error, Pokemon not found yet");
    }
  };
  const handlePokemonSwitch2 = (pokemonId: string) => {
    const newSelectedPokemon = getPokemonById(parseInt(pokemonId));
    if (newSelectedPokemon) {
      setSelectedPokemon2(newSelectedPokemon);
    } else {
      console.error("Error, Pokemon not found yet");
    }
  };
  const handlePokemonMenuToggle1 = () => {
    setShowPokemonMenu1((prev) => !prev);
  };
  const handlePokemonMenuToggle2 = () => {
    setShowPokemonMenu2((prev) => !prev);
  };

  const handlePokemonMenuClick1 = (pokemonId: number) => {
    setArrowIcon1("arrow_down.svg");
    handlePokemonSwitch1(String(pokemonId));
    setShowPokemonMenu1(false);
  };
  const handlePokemonMenuClick2 = (pokemonId: number) => {
    setArrowIcon2("arrow_down.svg"); 
    handlePokemonSwitch2(String(pokemonId));
    setShowPokemonMenu2(false);
  };

  const pokemonMenuItems = getAllPokemon();
  
  const handleVSIconClick = () => {
    setModalIsOpen(true);
  }; 
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleArrowIconClick1 = () => {
    setArrowIcon1((prevIcon) => (prevIcon === "arrow_down.svg" ? "arrow_up.svg" : "arrow_down.svg"));
    handlePokemonMenuToggle1();
  };
  const handleArrowIconClick2 = () => {
    setArrowIcon2((prevIcon) => (prevIcon === "arrow_down.svg" ? "arrow_up.svg" : "arrow_down.svg"));
    handlePokemonMenuToggle2();
  };

  useEffect(() => {
    if (!isLoading) {
      setSelectedPokemon1(getPokemonById(1) || null);
      setSelectedPokemon2(getPokemonById(2) || null);
    }
  }, [isLoading]);

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
        <h1> Fight </h1>
        <div className="pokemon-container">
          <PokemonBox
            selectedPokemon={selectedPokemon1}
            arrowIcon={arrowIcon1}
            showMenu={showPokemonMenu1}
            handleMenuToggle={handlePokemonMenuToggle1}
            handleMenuClick={handlePokemonMenuClick1}
            handleArrowIconClick={handleArrowIconClick1} 
            pokemonMenuItems={pokemonMenuItems}        
          />
          <Icon iconname="vs_icon.png" className="vs-icon" onClick={handleVSIconClick}/>
          <PokemonBox
            selectedPokemon={selectedPokemon2}
            arrowIcon={arrowIcon2}
            showMenu={showPokemonMenu2}
            handleMenuToggle={handlePokemonMenuToggle2}
            handleMenuClick={handlePokemonMenuClick2}
            handleArrowIconClick={handleArrowIconClick2}
            pokemonMenuItems={pokemonMenuItems}
          />
        </div>
        <BattleResult
          selectedPokemon1={selectedPokemon1}
          selectedPokemon2={selectedPokemon2}
          modalIsOpen={modalIsOpen}
          onCloseModal={handleCloseModal}
        />
                   
      </FightWrapper>
    </Layout>
  );
};
const FightWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .pokemon-container {
    display: flex;
    align-items: center;
    justify-content: center;

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

  h1 {
    font-size: 50px;
    color: var(--dark-pink);
    letter-spacing: 2px;
    margin-bottom: var(--space-xxl);
  }

  h2 {
    color: var(--dark-pink);
    font-size: var(--fs-2);
    margin: 0;
  }
  @media ${device.tablet} {
    flex-direction: column;

    .pokemon-container {
      flex-direction: column;
    }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%,
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

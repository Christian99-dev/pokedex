// pages/fight.tsx
import Image from 'next/image'; 
import React , { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styled from "styled-components";
import { device } from "@/theme/breakpoints";
import LoadingBanner from "@/components/LoadingBanner";
import {Pokemon, usePokemonContext } from "@/context/PokemonContext";
import TypeButton from '@/components/TypeButton';
import down_arrow from "@/icons_img/down_arrow.png"
import vsIcon from "@/icons_img/vs_icon..png"; 
import { responsiveCSS } from "@/theme/responsive";
import PokemonMenu from '@/components/PokemonMenu'; 

const Fight = () => {
  const {isLoading, getPokemonById, getAllPokemon} = usePokemonContext();
  const [showPokemonMenu1, setShowPokemonMenu1] = useState(false);
  const [showPokemonMenu2, setShowPokemonMenu2] = useState(false);
  const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | null>(getPokemonById(1) || null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | null>(getPokemonById(2) || null);


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
    handlePokemonSwitch1(String(pokemonId));
    setShowPokemonMenu1(false);
  };

  const handlePokemonMenuClick2 = (pokemonId: number) => {
    handlePokemonSwitch2(String(pokemonId));
    setShowPokemonMenu2(false);
  };

  const pokemonMenuItems = getAllPokemon();

  useEffect (() => {
    if(!isLoading) {
      setSelectedPokemon1(getPokemonById(1) ||null);
      setSelectedPokemon2(getPokemonById(2)||null)
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
          <div className="pokemon-box">
            <AnimatedPokemonImage src={selectedPokemon1?.image} alt={selectedPokemon1?.name}/>
            <div className="types-container">
              {selectedPokemon1?.types.map((type) => (
                <TypeButton key={type.type.name} typeName={type.type.name} />
              ))}
            </div>
            <h2> {selectedPokemon1?.name} </h2>
            <p>Number: 0{selectedPokemon1?.id} </p>    
            <DownArrowIcon
              src={down_arrow.src}
              alt="Down Arrow Icon"
              onClick={handlePokemonMenuToggle1}
            />
          <PokemonMenu
            show={showPokemonMenu1} menuItems={pokemonMenuItems} handlePokemonMenuClick={handlePokemonMenuClick1}
          />
          </div> 
          <div className='img-wrap'> 
            <Image className="vs-icon" src={vsIcon} alt="VS Icon" />
          </div> 
          <div className="pokemon-box">
            <AnimatedPokemonImage src={selectedPokemon2?.image} alt={selectedPokemon2?.name}/>
              <div className="types-container">
                {selectedPokemon2?.types.map((type) => (
                  <TypeButton key={type.type.name} typeName={type.type.name} />
                ))}
              </div>
              <h2> {selectedPokemon2?.name} </h2>
              <p>Number: 0{selectedPokemon2?.id} </p>
              <DownArrowIcon src={down_arrow.src} alt="Down Arrow Icon" onClick={handlePokemonMenuToggle2}/> 
              <PokemonMenu
                show={showPokemonMenu2}menuItems={pokemonMenuItems} handlePokemonMenuClick={handlePokemonMenuClick2}
              />
          </div>    
        </div>
      </FightWrapper>
    </Layout>
  );
};
const DownArrowIcon = styled.img`
  padding-top: 0px; 
  max-block-size: 40px; 
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.5);
  }
`;
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
  p{
    font-size: var(--fs-5);
    color: #d3ade579;
    margin-bottom: -10px;
  }
  img {
    height: 300px; 
    margin: var(--space-md);
    gap: var(--space-xxl);
    margin-bottom: var(--space-xxs);
  }
  .img-wrap {
    float:left; 
    margin-right: 5px; 

  }

  @media ${device.tablet} {
      flex-direction: column; 

      .pokemon-container{
        flex-direction: column;
      }
    }

  .vs-icon {
  width: 100px; 
  height: 100px; 
  cursor: pointer; 
  transition: all 0.1s ease-out;
  animation: bounce 4s infinite, rotate 2s linear 0s 1;

  &:hover{
    transition: all 0.3s ease-in;
    scale: 1.09;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(255, 0, 230, 0.2);
  }
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px) rotate(10deg); 
    }

    60% {
      transform: translateY(-10px) rotate(-10deg) ; 
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

const AnimatedPokemonImage= styled.img`
    margin-bottom: var(--space-md); 
    animation: fadeIn 2s ease-in-out; 

    @keyframes fadeIn {
      from {
        opacity: 0; 
        transform: translateY(-200px) translateX(-20px) rotate(90deg);
      }
      to {
        opacity: 1; 
        transform:translateY(0); 
        
      }
    }
`;  
export default Fight; 

/**https://beta.pokeapi.co/graphql/console/ */
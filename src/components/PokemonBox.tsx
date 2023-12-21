import React from "react";
import styled from "styled-components";
import { Pokemon } from "@/context/PokemonContext";
import TypeButton from "@/components/TypeButton";
import Icon from "@/components/Icon";
import PokemonMenu from "@/components/PokemonMenu";

interface PokemonBoxProps {
  selectedPokemon: Pokemon | null;
  arrowIcon: string;
  showMenu: boolean;
  handleMenuToggle: () => void;
  handleMenuClick: (pokemonId: number) => void;
  handleArrowIconClick: () => void;
  pokemonMenuItems: Array<Pokemon>; 
}

const PokemonBox: React.FC<PokemonBoxProps> = ({
  selectedPokemon,
  arrowIcon,
  showMenu,
  handleMenuToggle,
  handleMenuClick,
  handleArrowIconClick,
  pokemonMenuItems,
}) => {
  return (
    <PokemonBoxWrapper>
      <AnimatedPokemonImage
        src={selectedPokemon?.image}
        alt={selectedPokemon?.name}
      />
      <div className="types-container">
        {selectedPokemon?.types.map((type) => (
          <TypeButton key={type.type.name} typeName={type.type.name} />
        ))}
      </div>
      <h2> {selectedPokemon?.name} </h2>
      <p>Number: 0{selectedPokemon?.id} </p>
      <Icon iconname={arrowIcon} onClick={handleArrowIconClick} />
      <PokemonMenu
        show={showMenu}
        menuItems={pokemonMenuItems}
        handlePokemonMenuClick={handleMenuClick}
      />
    </PokemonBoxWrapper>
  );
};

const PokemonBoxWrapper = styled.div`
  img {
    height: 300px;
    margin: var(--space-md);
    gap: var(--space-xxl);
    margin-bottom: var(--space-xxs);
  }
  
  p {
    font-size: var(--fs-5);
    color: #d3ade579;
    margin-bottom: -10px;
  }
`;

const AnimatedPokemonImage = styled.img`
    margin-bottom: var(--space-md);
    animation: fadeIn 2s ease-in-out;

    @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-200px) translateX(-20px) rotate(90deg);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default PokemonBox;
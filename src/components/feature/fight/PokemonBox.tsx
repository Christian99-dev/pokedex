import React from "react";
import styled from "styled-components";
import { Pokemon } from "@/context/PokemonContext";
import TypeButton from "@/components/shared/TypeButton";

interface PokemonBoxProps {
  selectedPokemon: Pokemon | null;
}

const PokemonBox: React.FC<PokemonBoxProps> = ({ selectedPokemon }) => {
  return (
    <PokemonBoxWrapper>
      <AnimatedPokemonImage
        src={selectedPokemon?.image}
        alt={selectedPokemon?.name}
      />
      <div className="types-container">
        {selectedPokemon?.types.map((type) => (
          <TypeButton key={type} typeName={type} />
        ))}
      </div>
      <h2> {selectedPokemon?.name} </h2>
      <p>Number: 0{selectedPokemon?.id} </p>
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

  .types-container {
    display: flex;
    gap: var(--space-xs);
    justify-content: center;
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

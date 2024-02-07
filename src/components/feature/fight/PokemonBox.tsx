import React from 'react';
import styled from 'styled-components';
import TypeButton from '@/components/shared/TypeButton';
import { convertPokemonId } from '@/utils/helper';
import { Pokemon } from '@/context/PokemonContext';

const PokemonBox = ({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon | null;
}) => {
  return (
    <PokemonBoxWrapper>
      <img
        src={selectedPokemon?.image}
        alt={selectedPokemon?.name}
        className="pokemon-img"
      />
      <div className="info">
        <div className="types-container">
          {selectedPokemon?.types.map((type) => (
            <TypeButton key={type} typeName={type} />
          ))}
        </div>
        <h2> {selectedPokemon?.name} </h2>
        <p>{selectedPokemon?.id && convertPokemonId(selectedPokemon.id)} </p>
      </div>
    </PokemonBoxWrapper>
  );
};

const PokemonBoxWrapper = styled.div`
  .pokemon-img {
    height: var(--pokemon-img-m);
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
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    p {
      font-size: var(--fs-4);
      color: #d3ade579;
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
  }
`;

export default PokemonBox;

import React from 'react';
import styled from 'styled-components';
import { Pokemon } from '@/context/PokemonContext';

interface PokemonMenuProps {
  show: boolean;
  menuItems: Pokemon[];
  handlePokemonMenuClick: (pokemonId: number) => void;
}

const PokemonMenu: React.FC<PokemonMenuProps> = ({ show, menuItems, handlePokemonMenuClick }) => (
  <StyledPokemonMenu show={show}>
    {menuItems.map((pokemon) => (
      <MenuItem key={pokemon.id} onClick={() => handlePokemonMenuClick(pokemon.id)}>
        <div className="column">
          <PokemonId>0{pokemon.id}</PokemonId>
        </div>
        <div className="column">
          <PokemonName>{pokemon.name}</PokemonName>
        </div>
      </MenuItem>
    ))}
  </StyledPokemonMenu>
);

const StyledPokemonMenu = styled.div<{ show: boolean }>`
  position: absolute;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 10px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
  width: 30%; 
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  display: flex; 
  justify-content: space-between;
  background-color:var(--pink);  
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--dark-pink); 
  }
`;

const PokemonId = styled.div`
  font-weight: bold;
  color: #3498db; 
`;

const PokemonName = styled.div`
  color: #019d42; 
`;

export default PokemonMenu;
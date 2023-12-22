import React from 'react';
import styled from "styled-components";

type TypeButtonProps = {
  typeName: string;
};

const darkColors = ['#585858', '#7C538C', 'linear-gradient(90deg, #FF5959 50%, #003366 50%)', '#EB4971'];

const StyledButton = styled.button<{ backgroundcolor: string }>`
  width: 100px;
  height: 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  color: ${({ backgroundcolor }) => (darkColors.includes(backgroundcolor) ? '#FFFFFF' : '#120058')};
  font-size: 14px;
  font-weight: bold;
  background: ${({ backgroundcolor }) => backgroundcolor};
`;

const TypeButton: React.FC<TypeButtonProps> = ({ typeName }) => {
  const getButtonColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      bug: 'linear-gradient(90deg, #8CB330 50%, #BD9457 50%)',
      ice: '#AEE3F5',
      grass: '#8BBE8A',
      normal: '#B1B1B1',
      poison: '#A864C7',
      rock: '#C7B78B',
      ghost: '#7C538C',
      water: '#539AE2',
      psychic: '#F66F71',
      dark: '#585858',
      flying: 'linear-gradient(90deg, #A1D5F5 50%, #B3B3B3 50%)',
      ground: '#D9BF77',
      fighting: '#EB4971',
      fire: '#FFA756',
      electric: '#F2CB55',
      fairy: '#F4B1F4',
      dragon: 'linear-gradient(90deg, #FF5959 50%, #003366 50%)',
      steel: '#C3C3C3',
    };

    return colorMap[type] || '';
  };
  const backgroundcolor = getButtonColor(typeName); 
  return (
    <StyledButton backgroundcolor={backgroundcolor}>
      {typeName}
    </StyledButton>
  );
};

export default TypeButton;
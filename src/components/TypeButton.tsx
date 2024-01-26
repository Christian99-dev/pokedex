import React from "react";
import styled from "styled-components";

const TypeButton = ({
  typeName,
  onClick,
}: {
  typeName: string;
  onClick?: () => void;
}) => {
  const getButtonColor = (type: string) => {
    // Map type names to the colors
    const colorMap: { [key: string]: string } = {
      bug: "linear-gradient(90deg, #8CB330 50%, #BD9457 50%)",
      ice: "#AEE3F5",
      grass: "#8BBE8A",
      normal: "#B1B1B1",
      poison: "#A864C7",
      rock: "#C7B78B",
      ghost: "#7C538C",
      water: "#539AE2",
      psychic: "#F66F71",
      dark: "#585858",
      flying: "linear-gradient(90deg, #A1D5F5 50%, #B3B3B3 50%)",
      ground: "#D9BF77",
      fighting: "#EB4971",
      fire: "#FFA756",
      electric: "#F2CB55",
      fairy: "#F4B1F4",
      dragon: "linear-gradient(90deg, #FF5959 50%, #003366 50%)",
      steel: "#C3C3C3",
    };

    return colorMap[type] || "";
  };
  return (
    <StyledButton backgroundcolor={getButtonColor(typeName)} onClick={onClick}>
      {typeName}
    </StyledButton>
  );
};

const darkColors = [
  "#585858",
  "#7C538C",
  "linear-gradient(90deg, #FF5959 50%, #003366 50%)",
  "#EB4971",
];

const StyledButton = styled.div<{ backgroundcolor: string }>`
  cursor: pointer;
  background: ${({ backgroundcolor }) => backgroundcolor};
  border-radius: 5px;
  font-size: var(--fs-6);
  color: ${({ backgroundcolor }) =>
    darkColors.includes(backgroundcolor) ? "#FFFFFF" : "#120058"};
  font-weight: bold;
  width: min-content;
  padding: 0 var(--space-lg);
  display: inline-block;
  box-sizing: border-box;
`;

export default TypeButton;

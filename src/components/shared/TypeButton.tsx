import { darkColorTypes } from "@/theme/color";
import React from "react";
import styled from "styled-components";

const TypeButton = ({
  typeName,
  onClick,
}: {
  typeName: string;
  onClick?: () => void;
}) => {

  return (
    <StyledButton backgroundcolor={`var(--type-${typeName})`} className={darkColorTypes.includes(typeName) ? "dark" : "light"} onClick={onClick}>
      {typeName}
    </StyledButton>
  );
};

const StyledButton = styled.div<{ backgroundcolor: string}>`
  cursor: pointer;
  background: ${({ backgroundcolor }) => backgroundcolor};
  border-radius: 5px;
  color: var(--dark);
  font-size: var(--fs-6);
  font-weight: bold;
  width: min-content;
  padding: 0 var(--space-lg);
  display: inline-block;
  box-sizing: border-box;
  
  &.dark{
    color: var(--white);
  }
`;

export default TypeButton;

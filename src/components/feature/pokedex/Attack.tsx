import { darkColorTypes } from "@/theme/color";
import React from "react";
import styled from "styled-components";

const Attack = ({ name, type }: { name: string; type: string }) => {
  return (
    <AttackWrapper
      backgroundcolor={`var(--type-${type})`}
      className={darkColorTypes.includes(type) ? "dark" : "light"}
    >
      {name.toUpperCase()}
    </AttackWrapper>
  );
};

export default Attack;

const AttackWrapper = styled.div<{ backgroundcolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-4);
  color: var(--dark);
  font-weight: 600;
  border: 2.5px solid var(--white);
  border-radius: 5px;
  background: ${({ backgroundcolor }) => backgroundcolor};

  &.dark {
    color: var(--white);
  }
`;

import React from "react";
import styled from "styled-components";

const Button = ({ text }: { text: string }) => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.button`
  background-color: darkblue;
  padding: 10px;
  color: white;
  border: none;
  font-size: var(--fs-3);
  padding: var(--space-md) var(--space-lg);
`;

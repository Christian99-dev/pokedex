import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  placeholder,
  className,
  value,
  name,
  onChange,
  textarea,
}: {
  placeholder: string;
  className?: string;
  value?: string | number;
  name?: string;
  onChange: (e: any) => void;
  textarea?: boolean;
}) => {
  if (textarea)
    return (
      <TextareaField
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        value={value}
        name={name}
      />
    );
  return (
    <InputField
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      value={value}
      name={name}
    />
  );
};

const InputStyle = css`
  box-sizing: border-box;
  padding: var(--space-sm);
  font-size: var(--fs-5);
  background-color: transparent;
  border-radius: 10px;
  color: var(--pink);
  border: 2px solid var(--dark-pink);

  &::placeholder {
    color: var(--dark-pink);
    font-weight: 300;
  }

  &:hover {
    border-color: var(--pink);
    transition: border-color 0.2s ease-in;
  }

  &:focus,
  &:not(:placeholder-shown) {
    border-color: var(--pink);
    outline: none;
    transition: border-color 0.2s ease-in;
  }
`;

const InputField = styled.input`
  ${InputStyle}
`;

const TextareaField = styled.textarea`
  ${InputStyle}
`;

export default Input;

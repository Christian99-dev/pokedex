import React from "react";
import styled from "styled-components";
import Stat from "../feature/pokedex/Stat";

const ValueSlider = ({
  value,
  onChange,
  placeholder,
  max,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
  max: number;
  className?: string;
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <SliderWrapper className={className}>
      <Stat name={placeholder} value={value} />
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={handleSliderChange}
      />
    </SliderWrapper>
  );
};

export default ValueSlider;

const SliderWrapper = styled.div`
  input {
    width: 100%;
  }
`;

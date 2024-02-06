import React from "react";
import styled from "styled-components";

const Stat = ({
  name,
  value,
  border,
}: {
  name: string;
  value: string | number;
  border?: boolean;
}) => {
  let prettyValue : string | number = value
  if(name === "Höhe") {
    prettyValue = `${(Number(value) / 10).toFixed(1)} m`;
  }
  if(name === "Gewicht"){
    prettyValue = `${(Number(value) / 10).toFixed(1)} kg`;
  }
    
  return (
    <StatWrapper className={border ? "border" : ""}>
      <div className="name">{name}</div>
      <div className="value">{prettyValue}</div>
    </StatWrapper>
  );
};

export default Stat;

const StatWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: var(--space-md);
  align-items: center;
  justify-content: space-between;

  &.border {
    border-top: 1px white solid;
  }

  .name {
    color: white;
    font-weight: 500;
  }

  .value {
    font-weight: 100;
    color: var(--dark-pink);
  }
`;

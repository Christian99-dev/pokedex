import React from "react";
import styled from "styled-components";

const Stat = ({ name, value }: { name: string; value: string }) => {
  return (
    <StatWrapper>
      <div className="name">{name}</div>
      <div className="value">{value}</div>
    </StatWrapper>
  );
};

export default Stat;

const StatWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: var(--space-md);
  align-items: center;
  justify-content: left;

  .name {
    font-weight: 500;
  }

  .value {
    font-weight: 100;
    color: var(--dark-pink);
  }
`;

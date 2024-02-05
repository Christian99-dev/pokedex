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
  return (
    <StatWrapper className={border ? "border" : ""}>
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

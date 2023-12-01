// pages/fight.tsx
import React from "react";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import styled from "styled-components";

type FightPageProps = {
  pokemon1: any;
  pokemon2: any;
};

export const getStaticProps: GetStaticProps<FightPageProps> = async () => {

  const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
  const jsonData1 = await data1.json();

  const data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/2`);
  const jsonData2 = await data2.json();

  return {
    props: {
      pokemon1: jsonData1,
      pokemon2: jsonData2,
    },
  };
};

const FightPage: React.FC<FightPageProps> = ({ pokemon1, pokemon2 }) => {
  const { sprites: { front_default: frontDefault1 } } = pokemon1;
  const { sprites: { front_default: frontDefault2 } } = pokemon2;

  return (
    <Layout>
      <FightWrapper>
        <div className="pokemon-container">
          <img src={frontDefault1} alt="pokemon1" />
          <span>VS</span>
          <img src={frontDefault2} alt="pokemon2" />
        </div>
      </FightWrapper>
    </Layout>
  );
};

const FightWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .pokemon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 200px;
    margin: var(--space-md);
  }

  span {
    font-size: 24px;
    margin: 0 16px;
    color: #4caf50;
  }
`;

export default FightPage;
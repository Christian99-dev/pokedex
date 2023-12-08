// pages/fight.tsx
import Image from 'next/image'; 
import React from "react";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { device } from "@/theme/breakpoints";
import vsIcon from "@/icons_img/vs_icon..png"; 

type pokemonData={
  name: string; 
  id:number;
  types: Array<{type:{name:string}} >; 
  sprites: {front_default:string}; 
}; 

type FightPageProps = {
  data1: pokemonData;  
  data2: pokemonData; 
};

const Pokemon = ({data1, data2}: FightPageProps) => {
  const pokemon1= data1 ??{}; 
  const pokemon2= data2??{}; 
  return (
    <Layout>
      <FightWrapper>
        <h1> Fight </h1>
        <div className="pokemon-container">
          <div className="pokemon-box">
            <AnimatedPokemonImage src ={pokemon1.sprites?.front_default} alt={pokemon1.name}/>
            <p>Type: {pokemon1.types.map((type) => type.type.name).join(", ")}</p>
            <h2> {pokemon1.name} </h2>
            <p>Number: 0{pokemon1.id} </p>
          </div>
          <div className='img-wrap'> 
            <Image className="vs-icon" src={vsIcon} alt="VS Icon" />

          </div> 
          <div className="pokemon-box">
            <AnimatedPokemonImage src ={pokemon2.sprites?.front_default} alt={pokemon2.name}/>
            <p>Type: {pokemon2.types.map((type) => type.type.name).join(", ")}</p>
            <h2> {pokemon2.name} </h2>
            <p> Number: 0{pokemon2.id} </p>
          </div>
        </div> 
      </FightWrapper>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<FightPageProps> = async () => {
  const data1 = await fetch (`https://pokeapi.co/api/v2/pokemon/1`); 
  const data2= await fetch (`https://pokeapi.co/api/v2/pokemon/2`);
  const jsonData: pokemonData = await data1.json();
  const jsonData2: pokemonData = await data2.json();  
  return  {
    props: {
    data1: jsonData, 
    data2: jsonData2,
  }, 
}; 
}; 
export default Pokemon; 
const FightWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .pokemon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 50px;
    color: var(--dark-pink);
    letter-spacing: 2px;
  }
  h2 {
    color: var(--dark-pink);
    font-size: var(--fs-2);
    margin: 0;
  }
  p{
    font-size: var(--fs-5);
    color: #d3ade579;
  }
  

  img {
    height: 300px; 
    margin: var(--space-md);
    gap: var(--space-xxl);
    margin-bottom: var(--space-xxs);
  }
  .img-wrap {
    float:left; 
    margin-right: 5px; 

  }
  .vs-icon {
    width: 100px; 
    height: 100px; 
  }
  span {
    font-size: 24px;
    margin: 0 16px;
    color: #4caf50;
  }

  @media ${device.tablet} {
      flex-direction: column; 

      .pokemon-container{
        flex-direction: column;
      }
    }
`;

const AnimatedPokemonImage= styled.img`
    margin-bottom: var(--space-md); 
    animation: fadeIn 2s ease-in-out; 

    @keyframes fadeIn {
      from {
        opacity: 0; 
        transform: translateY(-200px) translateX(-20px) rotate(90deg);
        
      }
      to {
        opacity: 1; 
        transform:translateY(0); 
        
        
      }
    }
`; 
 


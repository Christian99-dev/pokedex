import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { responsiveCSS } from "@/theme/responsive";




type PageProps = {
  data: any
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {

  const randomPokemonId = Math.floor(Math.random() * 898) + 1;
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
  const jsonData = await data.json();
  console.log(jsonData); 
  return {
    props: {
      data: jsonData,
    },
  };
}


export default function Home({ data }: PageProps) {
  const { sprites: {
    front_default
  } } = data;
  return (
    <Layout>
      <PageWrapper>
        <h1> MyPokDex</h1>
        <img src={front_default} alt="pokemon" />
        <div className="buttons"> 
          <Button text="Pokedex" route="/pokedex" />
          <Button text="Fight" route="/fight" />
          <Button text="add Pokemon" route="/addPokemon" />
        </div>
      </PageWrapper>
    </Layout>

  );
}

const PageWrapper = styled.div`  
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  h1 {
    font-size: var(--fs-1);
    color: #4caf50;
    margin-bottom: var(--space-xl);;
  }

  h2 {
    font-size: var(--fs-2);
    margin: 0;
  }

  p {
    font-size: var(--fs-4);
    margin: 0;
  }

  .card {
    background-color: #845EC2;
    padding: 10px;
    width: 100%;
    color: white;
  }

  @media ${device.tablet} {
    flex-direction: column; 
  }

  img{
    height: 300px;
    margin: var(--space-md) 0;

  }
  > button {
    margin-bottom: var(--space-md);
  }

`;












/**  }
  .buttons {
    display: flex;
    justify-content: center;
    ${responsiveCSS("flex-direction", "row", "row", "row", "column", "column", "column")};
    ${responsiveCSS("margin", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)")};
  } */
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import { GetStaticProps } from "next";
import styled from "styled-components";

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
        <h1> MyPokeDex</h1>
        <img src={front_default} alt="pokemon" />
        <div className="buttons"> 
          <Button text="Pokedex" route="/pokedex" />
          <Button text="Fight" route="/fight" />
          <Button text="Custom" route="/addPokemon" />
        </div>
      </PageWrapper>
    </Layout>

  );
}

const PageWrapper = styled.div`  
display: flex;
flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  background-color: var(--dark);
  
  h1 {
    font-size: 50px;
    color: var(--dark-pink);
    letter-spacing: 2px;
    margin-bottom: var(--space-xxl);
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
  
  img{
    height: 300px;
    margin-bottom: var(--space-md);    
  }
  
  .buttons{
    display: flex;
    gap: var(--space-md);

    
  }
  
  
    @media ${device.tablet} {
      flex-direction: column; 

      .buttons{
        flex-direction: column;
      }
    }

`;












/**  }
  .buttons {
    display: flex;
    justify-content: center;
    ${responsiveCSS("flex-direction", "row", "row", "row", "column", "column", "column")};
    ${responsiveCSS("margin", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)")};
  } */
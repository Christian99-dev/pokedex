import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import createApolloClient from "../../apollo-client";

type PageProps = {
  data: any;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const numberOfPokemon = 492;

  // const data = await Promise.all(
  //   Array.from({ length: numberOfPokemon }, () =>
  //     fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * numberOfPokemon) + 1}`).then((response) => response.json())
  //   )
  // );

  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          next
          previous
          status
          message
          results {
            url
            name
            image
          }
        }
      }
    `,
    variables: { limit: 1200, offset: 0 }, // Hier die Variablen limit und offset übergeben
  });

  return {
    props: {
      data,
    },
  };
};
export default function Home({ data }: PageProps) {

  console.log("asd")
  // const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setCurrentPokemonIndex((prevIndex) => Math.floor(Math.random() * data.length));
  //     }, 15000);

  //     return () => clearInterval(intervalId);
  //   }, [data.length]);

  //   const { sprites: { front_default } } = data[currentPokemonIndex];

  return (
    <Layout>
      <PageWrapper>
        <h1> MyPokeDex</h1>
        <AnimatedPokemonImage src={data.pokemons.results[0].image} alt="pokemon" />
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
    background-color: #845ec2;
    padding: 10px;
    width: 100%;
    color: white;
  }

  img {
    height: 300px;
    margin-bottom: var(--space-md);
  }

  .buttons {
    display: flex;
    gap: var(--space-md);
  }

  @media ${device.tablet} {
    flex-direction: column;

    .buttons {
      flex-direction: column;
    }
  }
`;

const AnimatedPokemonImage = styled.img`
  height: 300px;
  margin-bottom: var(--space-md);
  animation: floatAndSpin 15s linear infinite; // Cool infinite animation

  @keyframes floatAndSpin {
    0% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 0;
    }
    25% {
      transform: translateY(-10px) rotate(90deg) scale(1.1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 1;
    }
    75% {
      transform: translateY(10px) rotate(-300deg) scale(1.3);
      opacity: 0.2;
    }
    100% {
      transform: translateY(0);
      opacity: 0;
    }
  }
`;

/**const AnimatedPokemonImage= styled.img`
    height: 300px; 
    margin-bottom: var(--space-md); 
    animation: fadeIn 1.5s ease-in-out; 

    @keyframes fadeIn {
      from {
        opacity: 0; 
        transform: translateY(-20px); 
      }
      to {
        opacity: 1; 
        transform:translateY(0); 
      }
    }
`; 
 */

/**  }
  .buttons {
    display: flex;
    justify-content: center;
    ${responsiveCSS("flex-direction", "row", "row", "row", "column", "column", "column")};
    ${responsiveCSS("margin", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)", "var(--space-md)")};
  } */

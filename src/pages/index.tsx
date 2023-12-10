import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PokemonProvider, usePokemonContext } from "@/context/PokemonContext";
import LoadingBanner from "@/components/LoadingBanner";

export default function Home({ data }: { data: any }) {
  const { isLoading, getAllPokemon } = usePokemonContext();
  const allPokemons = getAllPokemon();
  // const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setCurrentPokemonIndex((prevIndex) => Math.floor(Math.random() * data.length));
  //     }, 15000);

  //     return () => clearInterval(intervalId);
  //   }, [data.length]);

  //   const { sprites: { front_default } } = data[currentPokemonIndex];

  if (isLoading)
    return (
      <Layout>
        <LoadingBanner />
      </Layout>
    );

  return (
    <Layout>
      <PageWrapper>
        <h1> MyPokeDex</h1>
        <AnimatedPokemonImage src={allPokemons[0].image} alt="pokemon" />
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
  animation: floatAndSpin 15s linear infinite;

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

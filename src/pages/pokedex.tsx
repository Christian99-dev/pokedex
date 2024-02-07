import Layout from "@/components/shared/Layout";
import LoadingBanner from "@/components/shared/LoadingBanner";
import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import { useState } from "react";
import styled from "styled-components";
import PokemonList from "@/components/shared/PokemonList";

const Pokedex = () => {
  const { isLoading } = usePokemonContext();
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);

  if (isLoading)
    return (
      <Layout>
        <LoadingBanner />
      </Layout>
    );
  return (
    <Layout>
      <PageWrapper>
        <PokemonList state={activePokemon} setState={setActivePokemon} details={true} />
      </PageWrapper>
    </Layout>
  );
};

export default Pokedex;

const PageWrapper = styled.div`
  display: flex;
  flex: 1;

  .details {
    flex: 1;
    margin: 0 var(--space-xxxl);
  }

  .preview {
    padding: var(--space-sm);
    padding-right: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    ${responsiveCSS("width", 600, 400, 400, 400, 300, 300)}
  }
`;

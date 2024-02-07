import Layout from "@/components/shared/Layout";
import LoadingBanner from "@/components/shared/LoadingBanner";
import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
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
        <PokemonList
          className="whole-list"
          state={activePokemon}
          setState={setActivePokemon}
          details={true}
        />
      </PageWrapper>
    </Layout>
  );
};

export default Pokedex;

const PageWrapper = styled.div`
  display: flex;
  flex: 1;

  .whole-list {
    padding-left: var(--space-sm);
    padding-top: var(--space-sm);
  }
`;

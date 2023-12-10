import Layout from "@/components/Layout";
import LoadingBanner from "@/components/LoadingBanner";
import PokemonPreviewCard from "@/components/PokemonPreviewCard";
import { usePokemonContext } from "@/context/PokemonContext";
import styled from "styled-components";

const Pokedex = () => {
  const { getAllPokemon, isLoading } = usePokemonContext();
  const allPokemon = getAllPokemon();

  if (isLoading)
    return (
      <Layout>
        <LoadingBanner />
      </Layout>
    );

  return (
    <Layout>
      <PageWrapper>
        <div className="preview">
          <div className="search">
            <input placeholder="test" />
            <input placeholder="test" />
          </div>
          <div className="list">
            {allPokemon.map((pokemon, index) => (
              <PokemonPreviewCard pokemon={pokemon} key={index} />
            ))}
          </div>
        </div>
        <div className="details"></div>
      </PageWrapper>
    </Layout>
  );
};

export default Pokedex;

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;

  .details {
    width: 100%;
  }

  .preview {
    display: flex;
    flex-direction: column;

    .search {
      padding: var(--space-xxl);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: 0 var(--space-sm);
      overflow-y: scroll;

      /* custom scrollbar */
      /* width */
      &::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--dark-pink);
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--purple);
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
`;

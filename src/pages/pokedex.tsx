import Input from "@/components/shared/Input";
import Layout from "@/components/shared/Layout";
import LoadingBanner from "@/components/shared/LoadingBanner";
import PokemonDisplay from "@/components/feature/pokedex/PokemonDisplay";
import PokemonPreviewCard from "@/components/feature/pokedex/PokemonPreviewCard";
import TypeSelection from "@/components/shared/TypeSelection";
import { usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import { useMemo, useState } from "react";
import styled from "styled-components";

const Pokedex = () => {
  const { getAllPokemon, isLoading, getAllSessionPokemon, getPokemonById } = usePokemonContext();
  const allPokemon = getAllPokemon()

  const [activePokemon, setActivePokemon] = useState(getPokemonById(0));
  const [nameFilter, setNameFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const filteredPokemon = useMemo(() => {

    // Noch keine pokemon da
    if (allPokemon.length === 0) return [];

    // Filter anwenden
    const filtered = [...getAllSessionPokemon(),...allPokemon].filter((pokemon) => {
      const nameMatch = pokemon.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const numberMatch = String(pokemon.id).includes(numberFilter);

      const typeMatch =
        typeFilter.length === 0 ||
        pokemon.types.some((type) => typeFilter.includes(type));

      return nameMatch && numberMatch && typeMatch;
    });

  
    if (filtered.length !== 0) setActivePokemon(filtered[0]);
    if (filtered.length === 0) setActivePokemon(getPokemonById(1));

    return filtered;
    
  }, [nameFilter, numberFilter, typeFilter, allPokemon]); 


  const shiftPokemon = (dir: -1 | 1) => {
    
    if(!activePokemon) return;
    // Finding current pokemon array Index
    const arrayIdFromNextPokemon =
      filteredPokemon.indexOf(activePokemon) + 1 * dir;

    // Next index is out of bounds
    if (arrayIdFromNextPokemon === -1) {
      setActivePokemon(filteredPokemon[filteredPokemon.length - 1]);
      return;
    }

    if (arrayIdFromNextPokemon > filteredPokemon.length - 1) {
      setActivePokemon(filteredPokemon[0]);
      return;
    }
    
    setActivePokemon(filteredPokemon[filteredPokemon.indexOf(activePokemon) + 1 * dir]);
  };

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
            <Input
              placeholder="Name"
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <Input
              placeholder="Nummer"
              onChange={(e) => setNumberFilter(e.target.value)}
            />
            <TypeSelection state={typeFilter} setState={setTypeFilter} />
          </div>
          <div className="list-wrapper">
            <div className="list">
              {filteredPokemon.map((pokemon, index) => (
                <PokemonPreviewCard
                  pokemon={pokemon}
                  key={index}
                  active={activePokemon === pokemon}
                  onClick={() => setActivePokemon(pokemon)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="details">
          <PokemonDisplay
            pokemon={activePokemon}
            nextButton={() => shiftPokemon(1)}
            prevButton={() => shiftPokemon(-1)}
          />
        </div>
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
  }

  .preview {
    padding: var(--space-sm);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    ${responsiveCSS("width", 600, 400, 400, 400, 300, 300)}

    .search {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding-bottom: var(--space-sm);
    }

    .list-wrapper {
      height: 100%;
      position: relative;

      .list {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        position: absolute;
        overflow-y: scroll;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

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
  }
`;

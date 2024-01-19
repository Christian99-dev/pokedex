import Icon from "@/components/Icon";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import LoadingBanner from "@/components/LoadingBanner";
import PokemonDisplay from "@/components/PokemonDisplay";
import PokemonPreviewCard from "@/components/PokemonPreviewCard";
import TypeSelection from "@/components/TypeSelection";
import { usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Pokedex = () => {
  const { getAllPokemon, isLoading, getIdBoundaries } = usePokemonContext();
  const allPokemon = getAllPokemon();
  const { first, last } = getIdBoundaries();
  const [activePokemonID, setActivePokemonID] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const filteredPokemon = allPokemon.filter((pokemon) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const numberMatch = String(pokemon.id).includes(numberFilter);

    const typeMatch =
      typeFilter.length === 0 ||
      pokemon.types.some((type) => typeFilter.includes(type));

    return nameMatch && numberMatch && typeMatch;
  });

  const onTypeUpdate = (types: string[]) => setTypeFilter(types);

  const nextPokemon = () => {
    if (activePokemonID < last) {
      setActivePokemonID((prevID) => prevID + 1);
    } else {
      setActivePokemonID(first);
    }
  };

  const prevPokemon = () => {
    if (activePokemonID > first) {
      setActivePokemonID((prevID) => prevID - 1);
    } else {
      setActivePokemonID(last);
    }
  };

  const resetFilter = () => {
    setNameFilter("");
    setNumberFilter("");
    setTypeFilter([]);
  };

  useEffect(() => {
    if (!isLoading) {
      setActivePokemonID(allPokemon[0].id);
    }
  }, [isLoading]);

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
            <TypeSelection onUpdate={onTypeUpdate} />
          </div>
          <div className="list">
            {filteredPokemon.map((pokemon, index) => (
              <PokemonPreviewCard
                pokemon={pokemon}
                key={index}
                active={activePokemonID === pokemon.id}
                onClick={() => setActivePokemonID(pokemon.id)}
              />
            ))}
          </div>
        </div>
        <div className="details">
          <PokemonDisplay
            pokemonID={activePokemonID}
            nextButton={() => {
              nextPokemon();
              resetFilter();
            }}
            prevButton={() => {
              prevPokemon();
              resetFilter();
            }}
          />
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default Pokedex;

const PageWrapper = styled.div`
  display: flex;
  height: 100%;

  .details {
    width: 100%;
    margin: auto var(--space-xxxl);
  }

  .preview {
    display: flex;
    flex-direction: column;
    ${responsiveCSS("width", 1000, 800, 700, 400, 300, 300)}

    .search {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-lg) var(--space-sm);
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

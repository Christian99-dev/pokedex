import Input from "@/components/shared/Input";
import Layout from "@/components/shared/Layout";
import LoadingBanner from "@/components/shared/LoadingBanner";
import PokemonDisplay from "@/components/feature/pokedex/PokemonDisplay";
import PokemonPreviewCard from "@/components/feature/pokedex/PokemonPreviewCard";
import TypeSelection from "@/components/shared/TypeSelection";
import { usePokemonContext } from "@/context/PokemonContext";
import { responsiveCSS } from "@/theme/responsive";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ValueSlider from "@/components/shared/Slider";
import pokemonMaxStats from "@/utils/pokemonMaxStats";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

const Pokedex = () => {
  const { getAllPokemon, isLoading, getAllSessionPokemon, getPokemonById } =
    usePokemonContext();
  const allPokemon = getAllPokemon();
  const infiniteScrollCount = 10;

  // State
  const [queryKey, setQueryKey] = useState("key"); // State, um das Query zurückzusetzen
  const [activePokemon, setActivePokemon] = useState(getPokemonById(0));
  const [typesFilter, setTypesFilter] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    name: string;
    weight: number;
    base_experience: number;
    height: number;
    capture_rate: number;
  }>({
    name: "",
    weight: 0,
    base_experience: 0,
    height: 0,
    capture_rate: 0,
  });

  // Memo
  const filteredPokemon = useMemo(() => {
    // Noch keine pokemon da
    if (allPokemon.length === 0) return [];

    // Filter anwenden
    const filtered = [...getAllSessionPokemon(), ...allPokemon].filter(
      (pokemon) => {
        const nameMatch = pokemon.name
          .toLowerCase()
          .includes(filter.name.toLowerCase());

        let typeMatch = true;

        if (typesFilter.length === 1) {
          typeMatch = pokemon.types.includes(typesFilter[0]);
        } else if (typesFilter.length > 1) {
          typeMatch = typesFilter.every((type) => pokemon.types.includes(type));
        }

        const heightMatch = pokemon.height >= filter.height;
        const weightMatch = pokemon.weight >= filter.weight;
        const base_experienceMatch =
          pokemon.base_experience >= filter.base_experience;
        const capture_rateMatch = pokemon.capture_rate >= filter.capture_rate;

        return (
          nameMatch &&
          typeMatch &&
          heightMatch &&
          weightMatch &&
          base_experienceMatch &&
          capture_rateMatch
        );
      }
    );

    if (filtered.length !== 0) setActivePokemon(filtered[0]);
    if (filtered.length === 0) setActivePokemon(getPokemonById(1));

    // Reset useInfiniteQuery every time this is triggered
    setQueryKey(queryKey + "a");

    return filtered;
  }, [filter, typesFilter, allPokemon]); // all pokemon rein, da wegen fetchen anfangs leer

  // useInfiniteQuery
  const { data: filteredPokemonPages, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }: { pageParam: any }) => {
      return getNextPokemonPage(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    getPreviousPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  // Ref
  const lastPokemonPreviewRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPokemonPreviewRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) fetchNextPage();

  // Helper
  const shiftPokemon = (dir: -1 | 1) => {
    if (!activePokemon) return;
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

    setActivePokemon(
      filteredPokemon[filteredPokemon.indexOf(activePokemon) + 1 * dir]
    );
  };

  const getNextPokemonPage = (pageCount: any) => {
    return filteredPokemon.slice(
      (pageCount - 1) * infiniteScrollCount,
      pageCount * infiniteScrollCount
    );
  };

  const filterValue = (key: string, value: string | number) =>
    setFilter({ ...filter, [key]: value });

  const filteredPokemonPagesFlattend = filteredPokemonPages?.pages.flatMap(
    (page) => page
  );

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
            <ValueSlider
              value={filter.height}
              placeholder="Höhe"
              onChange={(e) => filterValue("height", e)}
              max={pokemonMaxStats.height}
              className="height"
            />

            <ValueSlider
              value={filter.weight}
              placeholder="Gewicht"
              onChange={(e) => filterValue("weight", e)}
              max={pokemonMaxStats.weight}
              className="weight"
            />

            <ValueSlider
              value={filter.base_experience}
              placeholder="Basiserfahrung"
              onChange={(e) => filterValue("base_experience", e)}
              max={pokemonMaxStats.base_experience}
              className="base-experience"
            />

            <ValueSlider
              value={filter.capture_rate}
              placeholder="Fangrate"
              onChange={(e) => filterValue("capture_rate", e)}
              max={pokemonMaxStats.capture_rate}
              className="capture-rate"
            />

            <TypeSelection
              className="types"
              state={typesFilter}
              setState={setTypesFilter}
              active={typesFilter.length < 2}
            />

            <Input
              value={filter.name}
              placeholder="Name"
              onChange={(e) => filterValue("name", e.target.value)}
              className="name"
            />
          </div>
          <div className="list-wrapper">
            <div className="list">
              {filteredPokemonPagesFlattend?.map((pokemon, index) => {
                return (
                  <PokemonPreviewCard
                    pokemon={pokemon}
                    key={index}
                    active={activePokemon === pokemon}
                    onClick={() => setActivePokemon(pokemon)}
                    innerRef={
                      index === filteredPokemonPagesFlattend.length - 1
                        ? ref
                        : null
                    }
                  />
                );
              })}
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
    margin: 0 var(--space-xxxl);
  }

  .preview {
    padding: var(--space-sm);
    padding-right: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    ${responsiveCSS("width", 600, 400, 400, 400, 300, 300)}

    .search {
      display: grid;
      grid-template-areas:
        "height weight"
        "base-experience capture-rate"
        "types types"
        "name name";
      grid-auto-columns: 1fr;
      gap: var(--space-sm);
      padding-bottom: var(--space-sm);

      .name {
        grid-area: name;
      }
      .height {
        grid-area: height;
      }
      .weight {
        grid-area: weight;
      }
      .base-experience {
        grid-area: base-experience;
      }
      .capture-rate {
        grid-area: capture-rate;
      }
      .types {
        grid-area: types;
      }
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

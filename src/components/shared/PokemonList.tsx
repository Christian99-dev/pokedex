import { Pokemon, usePokemonContext } from "@/context/PokemonContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import PokemonPreviewCard from "../feature/pokedex/PokemonPreviewCard";
import { useIntersection } from "@mantine/hooks";
import pokemonMaxStats from "@/config/pokemonMaxStats";
import ValueSlider from "./Slider";
import TypeSelection from "./TypeSelection";
import Input from "./Input";
import styled from "styled-components";
import PokemonDisplay from "../feature/pokedex/PokemonDisplay";
import { responsiveCSS } from "@/theme/responsive";

const PokemonList = ({
  state,
  setState,
  details,
}: {
  state: Pokemon | null;
  setState: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  details: boolean;
}) => {
  const { getAllPokemon, getAllSessionPokemon } = usePokemonContext();
  const allPokemon = getAllPokemon();
  const infiniteScrollCount = 10;

  // Setup State
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [queryKey, setQueryKey] = useState(0); // State, um das Query zurückzusetzen
  const [typesFilter, setTypesFilter] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    name: "",
    weight: 0,
    base_experience: 0,
    height: 0,
    capture_rate: 0,
  });

  // Filtered Pokemon state | Nicht mehr mit memo gelöst damit der setState von aussen nach der rendering phase ausgelöst wird
  // if (filteredPokemon.length !== 0) setState(filteredPokemon[0]);
  useEffect(() => {
    // Noch keine pokemon da
    if (allPokemon.length === 0) return;

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

    // Wenn "neue liste"
    if (filtered.length !== 0) setState(filtered[0]);

    setFilteredPokemon(filtered);
    setQueryKey(queryKey + 1);
  }, [filter, typesFilter, allPokemon]);

  // Infinity Scroll
  const { data: filteredPokemonPages, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }: { pageParam: any }) => {
      return filteredPokemon.slice(
        (pageParam - 1) * infiniteScrollCount,
        pageParam * infiniteScrollCount
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    getPreviousPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });
  const lastPokemonPreviewRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPokemonPreviewRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) fetchNextPage();

  // Helper
  const shiftPokemon = (dir: -1 | 1) => {
    if (!state) return;
    // Finding current pokemon array Index
    const arrayIdFromNextPokemon = filteredPokemon.indexOf(state) + 1 * dir;

    // Next index is out of bounds
    if (arrayIdFromNextPokemon === -1) {
      setState(filteredPokemon[filteredPokemon.length - 1]);
      return;
    }

    if (arrayIdFromNextPokemon > filteredPokemon.length - 1) {
      setState(filteredPokemon[0]);
      return;
    }

    setState(filteredPokemon[filteredPokemon.indexOf(state) + 1 * dir]);
  };

  const filterValue = (key: string, value: string | number) =>
    setFilter({ ...filter, [key]: value });

  const filteredPokemonPagesFlattend = filteredPokemonPages?.pages.flatMap(
    (page) => page
  );

  return (
    <PokemonListWrapper>
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
                  active={state === pokemon}
                  onClick={() => setState(pokemon)}
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
      {details && (
        <div className="details">
          <PokemonDisplay
            pokemon={state}
            nextButton={() => shiftPokemon(1)}
            prevButton={() => shiftPokemon(-1)}
          />
        </div>
      )}
    </PokemonListWrapper>
  );
};

export default PokemonList;

const PokemonListWrapper = styled.div`
  height: 100%;
  display: flex;
  width: 100%;

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
      position: relative;
      flex: 1;
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

  .details {
    flex: 1;
    margin: 0 var(--space-xxxl);
  }
`;

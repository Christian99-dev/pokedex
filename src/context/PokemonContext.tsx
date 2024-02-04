import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAllPokemonsFromSession } from "@/utils/sessionTools";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: Array<string>;
  description: string | null;
};

type ContextValue = {
  getPokemonById: (id: number) => Pokemon | null | undefined;
  getAllPokemon: () => Pokemon[] | [];
  getAllSessionPokemon: () => Pokemon[] | [];
  isLoading: boolean;
  getNextFreeId: () => number;
  allTypes: string[];
  getRandomPokemonImage: () => string;
};

const PokemonContext = createContext<ContextValue>({
  getPokemonById: () => null,
  getAllPokemon: () => [],
  getAllSessionPokemon: () => [],
  isLoading: true,
  getNextFreeId: () => 0,
  allTypes: [],
  getRandomPokemonImage: () => "",
});

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = new ApolloClient({
    uri: "https://beta.pokeapi.co/graphql/v1beta",
    cache: new InMemoryCache(),
  });
  const pokemonCount = 493;
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allTypes, setAllTypes] = useState<string[]>([]);

  // Sesssion pokemons behandle ich seperat und speichere sie nicht zwischen, aus folgenen gründen unten (siehe kommentare an den kritischen stellen)

  const getPokemonById = (id: number) =>
    isLoading
      ? null
      : [...allPokemon, ...getAllSessionPokemon()].find(
          (pokemon) => pokemon.id === id
        );

  const getAllPokemon = () => {
    if (isLoading) {
      return [];
    }

    return allPokemon;

    // warum nicht ? return [...getAllPokemonsFromSession(),...pokemonData];
    // useMemo würde dies immer als eine neues object sehen, und somit immer feuern
  };

  // Eigentlich unnätig, ich möchte aber das man alles was mit pokemons zutun hat, aus dem context nimmt
  const getAllSessionPokemon = () => {
    return getAllPokemonsFromSession();
  };

  const getNextFreeId = () => {
    return pokemonCount + getAllSessionPokemon().length + 1;
  };

  const getRandomPokemonImage = () => {
    if (isLoading) return "";

    return allPokemon[Math.floor(Math.random() * pokemonCount - 1)].image;
  };

  useEffect(() => {
    client
      .query({
        query: gql`
          query MyQuery {
            pokemon_v2_pokemon(limit: ${pokemonCount}) {
              id
              name
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        `,
      })
      .then(({ data }) => {
        let allTypesWithDuplicate: string[] = [];

        // Parsing pokemons from graphql
        const parsedPokemons: Pokemon[] = data.pokemon_v2_pokemon.map(
          (pokemon: any) => {
            let allTypes = pokemon.pokemon_v2_pokemontypes.map(
              (type: any) => type.pokemon_v2_type.name
            );

            allTypesWithDuplicate.push(...allTypes);

            return {
              id: pokemon.id,
              name: pokemon.name.toUpperCase(),
              types: allTypes,
              image: pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default,
              description: null,
            };
          }
        );

        // Warum nicht  setPokemonData([...parsedPokemons, ...getPokemonsFromSession()]);
        // Wenn sich die session pokemons ändern, müsste ich die seite reloaden, damit dieser useEffect ausgeführt wird und ich die neueste version habe
        setAllPokemon(parsedPokemons);
        setAllTypes(Array.from(new Set(allTypesWithDuplicate)));
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        getPokemonById,
        getAllPokemon,
        getAllSessionPokemon,
        isLoading,
        getNextFreeId,
        allTypes,
        getRandomPokemonImage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

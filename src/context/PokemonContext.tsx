import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAllPokemonsFromSession } from "@/utils/sessionTools";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: Array<string>;
  description: string | null;
  moves: { name: string; type: string };
  weight: number;
  base_experience: number;
  height: number;
  capture_rate: number;
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
              pokemon_v2_pokemonmoves(limit: 4) {
                pokemon_v2_move {
                  name
                  pokemon_v2_type {
                    name
                  }
                }
              }
              pokemon_v2_pokemonstats(limit: 1) {
                pokemon_v2_pokemon {
                  base_experience
                  height
                  pokemon_v2_pokemonspecy {
                    capture_rate
                  }
                }
              }
              weight
            }
          }
        `,
      })
      .then(({ data }) => {
        let allTypesWithDuplicate: string[] = [];

        // Parsing pokemons from graphql
        const parsedPokemons: Pokemon[] = data.pokemon_v2_pokemon.map(
          (pokemon: any) => {
            const moves = pokemon.pokemon_v2_pokemonmoves
              .map((rawMove: any) => {
                return {
                  name: rawMove.pokemon_v2_move.name,
                  type: rawMove.pokemon_v2_move.pokemon_v2_type.name,
                };
              });

            const types = pokemon.pokemon_v2_pokemontypes.map(
              (rawType: any) => rawType.pokemon_v2_type.name
            );
            const image =
              pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default;
            const name = pokemon.name.toUpperCase();
            const description = null;
            const id = pokemon.id;
            const weight = pokemon.weight;
            const base_experience = pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon.base_experience
            const height = pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon.height
            const capture_rate = pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon.pokemon_v2_pokemonspecy.capture_rate

            allTypesWithDuplicate.push(...types)

            return {
              id: id,
              name: name,
              types: types,
              image: image,
              description: description,
              moves: moves,
              weight: weight,
              base_experience: base_experience,
              height: height,
              capture_rate: capture_rate
            };
          }
        );

        console.log("out ", parsedPokemons)

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

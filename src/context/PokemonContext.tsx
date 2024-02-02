import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAllPokemonsFromSession } from "@/utils/customPokemonsSessions";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: Array<string>;
  description: string;
};

type ContextValue = {
  getPokemonById: (id: number) => Pokemon | null | undefined;
  getAllPokemon: () => Pokemon[] | [];
  isLoading: boolean;
  getIdBoundaries: () => { first: number; last: number };
  allTypes: string[];
};

const PokemonContext = createContext<ContextValue>({
  getPokemonById: () => null,
  getAllPokemon: () => [],
  isLoading: true,
  getIdBoundaries: () => ({ first: 0, last: 0 }),
  allTypes: [],
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
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  
  const getPokemonById = (id: number) =>
    isLoading ? null : pokemonData.find((pokemon) => pokemon.id === id);

  const getAllPokemon = () => (isLoading ? [] : pokemonData);

  const getIdBoundaries = () => {
    const first = isLoading ? 0 : pokemonData[0].id || 0;
    const last = isLoading ? 0 : pokemonData[pokemonData.length - 1].id || 0;
    return { first, last };
  };
  

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query MyQuery {
              pokemon_v2_pokemon(limit: 1009) {
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
        });
        let allTypesWithDuplicate: string[] = [];


        if (data && data.pokemon_v2_pokemon) {
          // Adding session pokemons
          const sessionPokemons: Pokemon[] = getAllPokemonsFromSession();

          // Parsing pokemons from graphql
          const parsedPokemons: Pokemon[] = data.pokemon_v2_pokemon.map((pokemon: any) => {
            let allTypes = pokemon.pokemon_v2_pokemontypes.map(
              (type: any) => type.pokemon_v2_type.name
            );

            allTypesWithDuplicate.push(...allTypes);

            return {
              id: pokemon.id,
              name: pokemon.name.toUpperCase(),
              types: allTypes,
              image: pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default,
              description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidu",
            };
          });

          setPokemonData([...sessionPokemons, ...parsedPokemons]);
          setAllTypes(Array.from(new Set(allTypesWithDuplicate)));
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);


  return (
    <PokemonContext.Provider
      value={{
        getPokemonById,
        getAllPokemon,
        isLoading,
        getIdBoundaries,
        allTypes,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};


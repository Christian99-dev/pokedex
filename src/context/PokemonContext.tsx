import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
};

type ContextValue = {
  getPokemonById: (id: number) => Pokemon | null | undefined;
  getAllPokemon: () => Pokemon[] | [];
  isLoading: boolean;
  getIdBoundaries: () => { first: number; last: number };
};

const PokemonContext = createContext<ContextValue>({
  getPokemonById: () => null,
  getAllPokemon: () => [],
  isLoading: true,
  getIdBoundaries: () => ({ first: 0, last: 0 }),
});

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.graphcdn.app",
    cache: new InMemoryCache(),
  });
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetAllPokemons {
              pokemons(limit: 10) {
                results {
                  name
                  image
                  id
                }
              }
            }
          `,
        });

        if (data && data.pokemons && data.pokemons.results) {
          const modifiedPokemons = data.pokemons.results.map(
            (pokemon: Pokemon) => ({
              ...pokemon,
              name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
            })
          );

          setPokemonData(modifiedPokemons);
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const getPokemonById = (id: number) =>
    isLoading ? null : pokemonData.find((pokemon) => pokemon.id === id);

  const getAllPokemon = () => (isLoading ? [] : pokemonData);

  const getIdBoundaries = () => {
    const first = isLoading ? 0 : pokemonData[0].id || 0;
    const last = isLoading ? 0 : pokemonData[pokemonData.length - 1].id || 0;
    return { first, last };
  };

  return (
    <PokemonContext.Provider
      value={{ getPokemonById, getAllPokemon, isLoading, getIdBoundaries }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

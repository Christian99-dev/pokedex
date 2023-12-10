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
};

const PokemonContext = createContext<ContextValue>({
  getPokemonById: () => null,
  getAllPokemon: () => [],
  isLoading: true,
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
              pokemons(limit: 1000) {
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
          setPokemonData(data.pokemons.results);
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

  return (
    <PokemonContext.Provider
      value={{ getPokemonById, getAllPokemon, isLoading }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

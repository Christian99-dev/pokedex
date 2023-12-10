import React, { createContext, useContext, useEffect, useState } from "react";
import {
  gql,
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

type Pokemon = any;

type ContextValue = {
  getPokemonById: (id: number) => Pokemon | null;
  getAllPokemon: () => Pokemon[] | null;
  isLoading: boolean;
};

const PokemonContext = createContext<ContextValue | undefined>(undefined);

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }: {children: React.ReactNode}) => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.graphcdn.app",
    cache: new InMemoryCache(),
  });
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetAllPokemons {
              pokemons(limit: 1292) {
                results {
                  name
                  image
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
    isLoading ? null : pokemonData.find((pokemon) => true);

  const getAllPokemon = () => (isLoading ? null : pokemonData);

  return (
    <PokemonContext.Provider
      value={{ getPokemonById, getAllPokemon, isLoading }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

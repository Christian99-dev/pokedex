import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useApolloClient,
  gql,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
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
              pokemons(limit: 8000) {
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

  const getPokemonById = (id) =>
    isLoading ? null : pokemonData.find((pokemon) => pokemon.id === id);

  const getAllPokemon = () => (isLoading ? null : pokemonData);

  return (
    <PokemonContext.Provider
      value={{ getPokemonById, getAllPokemon, isLoading }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

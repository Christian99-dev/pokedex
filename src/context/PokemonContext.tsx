import React, { createContext, useContext, useEffect, useState } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { getAllPokemonsFromSession } from "@/utils/session";
import { getRandomInt } from "@/utils/helper";
import ALL_POKEMON from "@/query/allPokemon";
import { nextPokemons, pokemonCount } from "@/config/pokemonFetchCount";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: Array<string>;
  description: string | null;
  moves: Move[] | null;
  weight: number;
  base_experience: number;
  height: number;
  capture_rate: number;
};

export type Move = { name: string; type: string };

type ContextValue = {
  getPokemonById: (id: number) => Pokemon | null | undefined;
  getAllPokemon: () => Pokemon[] | [];
  getAllSessionPokemon: () => Pokemon[] | [];
  isLoading: boolean;
  getNextFreeId: () => number;
  allTypes: string[];
  getRandomPokemonImage: () => Promise<string>; 
};

const PokemonContext = createContext<ContextValue>({
  getPokemonById: () => null,
  getAllPokemon: () => [],
  getAllSessionPokemon: () => [],
  isLoading: true,
  getNextFreeId: () => 0,
  allTypes: [],
  getRandomPokemonImage: () => Promise.resolve(""), 
});

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({
  children,
  client
}: {
  children: React.ReactNode;
  client: ApolloClient<NormalizedCacheObject>
}) => {
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
    // useEffect würde dies immer als eine neues object sehen, und somit immer feuern
  };

  const getAllSessionPokemon = () => {
    return getAllPokemonsFromSession();
  };

  const getNextFreeId = () => {
    return pokemonCount + getAllSessionPokemon().length + 1;
  };

  const getRandomPokemonImage = async () => {
    try {
      const randomID = getRandomInt(pokemonCount + 1, pokemonCount + nextPokemons)
      // Fetch Pokémon-Daten
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
      const pokemonData = await pokemonResponse.json();
      // Rückgabe des Bild-URLs
      return pokemonData.sprites.front_default;
    } catch (error) {
      console.error('Fehler beim Abrufen des zufälligen Pokémon-Bilds:', error);
      return null;
    }

  };

  useEffect(() => {
    client
      .query({
        query: ALL_POKEMON(pokemonCount),
      })
      .then(({ data }) => {
        let allTypesWithDuplicate: string[] = [];

        // Parsing pokemons from graphql
        const parsedPokemons: Pokemon[] = data.pokemon_v2_pokemon.map(
          (pokemon: any) => {
            let moves: Move[] = [];
            pokemon.pokemon_v2_pokemonmoves.map((rawMove: any) => {
              if (
                moves
                  .map((move) => move.name)
                  .includes(rawMove.pokemon_v2_move.name)
              )
                return;

              moves.push({
                name: rawMove.pokemon_v2_move.name,
                type: rawMove.pokemon_v2_move.pokemon_v2_type.name,
              });
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
            const base_experience =
              pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon
                .base_experience;
            const height =
              pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon.height;
            const capture_rate =
              pokemon.pokemon_v2_pokemonstats[0].pokemon_v2_pokemon
                .pokemon_v2_pokemonspecy.capture_rate;

            allTypesWithDuplicate.push(...types);

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
              capture_rate: capture_rate,
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

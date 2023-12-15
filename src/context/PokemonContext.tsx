import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: Array<{type:{name:string}} >; 
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
    uri: "https://beta.pokeapi.co/graphql/v1beta",
    cache: new InMemoryCache(),
  });
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await client.query({
            query: gql`
                query MyQuery {
                    pokemon_v2_pokemon (limit: 1009){
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
        console.log(data);
        if (data && data.pokemon_v2_pokemon) {
            const parsedPokemons = data.pokemon_v2_pokemon.map((pokemon: any) => {
              const sprites = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
              const frontDefaultImage = sprites.front_default;
    
              return {
                id: pokemon.id,
                name: pokemon.name.toUpperCase(),
                types: pokemon.pokemon_v2_pokemontypes.map((type: any) => ({
                  type: {
                    name: type.pokemon_v2_type.name,
                  },
                })),
                image: frontDefaultImage,
              };
            });
          setPokemonData(parsedPokemons);
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
      value={{ getPokemonById, getAllPokemon, isLoading, getIdBoundaries}}
    >
      {children}
    </PokemonContext.Provider>
  );
};






/**const selectedPokemon= pokemonData.find((pokemon) => pokemon.id === id);
    if(!isLoading && selectedPokemon) {
        return selectedPokemon; 
    }
    console.error("Error, Pokemon not found")
} */
/**query MyQuery {
  pokemon_v2_pokemon {
    id
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
    
  }
  pokemon_v2_characteristicdescription {
    description
    id
  }
  pokemon_v2_pokedexdescription(where: {pokemon_v2_language: {pokemonV2LanguagenamesByLocalLanguageId: {}}}) {
    id
    description
    pokedex_id
    language_id
  }
}
 */

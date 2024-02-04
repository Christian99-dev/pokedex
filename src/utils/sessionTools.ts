import { Pokemon } from "@/context/PokemonContext";

export const addPokemonToSession = (newPokemon: Pokemon) => {
  const sessionPokemons = getAllPokemonsFromSession();
  sessionPokemons.push(newPokemon);
  window.sessionStorage.setItem(
    "customPokemons",
    JSON.stringify(sessionPokemons)
  );
};

export const getAllPokemonsFromSession = (): Pokemon[] => {
  const customPokemonSessionString: string | null =
    window.sessionStorage.getItem("customPokemons");
  return customPokemonSessionString
    ? JSON.parse(customPokemonSessionString)
    : [];
};

export const deletePokemonByIdFromSession = (id: number) => {};

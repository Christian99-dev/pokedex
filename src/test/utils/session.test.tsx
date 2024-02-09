import {
  addPokemonToSession,
  getAllPokemonsFromSession,
} from "@/utils/session";

import sessionMockPokemon from "@/mocks/sessionPokemon.json"

describe("Utils", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  describe("addPokemonToSession", () => {
    it("adds a new Pokemon to session storage", () => {
      addPokemonToSession(sessionMockPokemon);

      const sessionPokemons = getAllPokemonsFromSession();
      expect(sessionPokemons).toHaveLength(1);
      expect(sessionPokemons[0]).toEqual(sessionMockPokemon);
    });
  });

  describe("getAllPokemonsFromSession", () => {
    it("returns an empty array if no Pokemon in session storage", () => {
      const sessionPokemons = getAllPokemonsFromSession();
      expect(sessionPokemons).toEqual([]);
    });

    it("returns an array of Pokemon from session storage", () => {
      window.sessionStorage.setItem(
        "customPokemons",
        JSON.stringify([sessionMockPokemon])
      );

      const sessionPokemons = getAllPokemonsFromSession();
      expect(sessionPokemons).toHaveLength(1);
      expect(sessionPokemons[0]).toEqual(sessionMockPokemon);
    });
  });
});

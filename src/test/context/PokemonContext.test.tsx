import React, { useEffect, useState } from "react";
import { RenderResult, act, render, waitFor } from "@testing-library/react";
import { PokemonProvider, usePokemonContext } from "@/context/PokemonContext";
import mockApolloClient from "@/mocks/apolloMockClient";
import mockSessionPokemon from "@/mocks/sessionPokemon.json";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { addPokemonToSession } from "@/utils/session";
import { pokemonCount } from "@/config/pokemonFetchCount";

describe("PokemonProvider", () => {
  beforeAll(() => {
    addPokemonToSession(mockSessionPokemon);
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe("Rendering", () => {
    it("renders without errors", async () => {
      await act(async () => {
        render(
          <PokemonProvider client={mockApolloClient}>
            <div />
          </PokemonProvider>
        );
      });
    });
  });

  describe("PokemonContext GraphQL + Session", () => {
    let component: RenderResult | undefined;

    beforeEach(async () => {
      await act(async () => {
        component = render(
          <PokemonProvider client={mockApolloClient}>
            <TestComponentContextOperations />
          </PokemonProvider>
        );
      });
    });

    it("retrieves all pokemons", () => {
      expect(component?.getByTestId("get-all-pokemons")).toHaveTextContent(
        "BULBASAUR IVYSAUR VENUSAUR CHARMANDER"
      );
    });

    it("gives a Pokemon by id", () => {
      expect(component?.getByTestId("get-pokemon-by-id")).toHaveTextContent(
        "IVYSAUR"
      );
    });

    it("retrieves all session pokemons", () => {
      expect(
        component?.getByTestId("get-all-session-pokemon")
      ).toHaveTextContent("Michael Jackson");
    });

    it("retrieves the next free pokemon id", () => {
      expect(
        component?.getByTestId("get-next-free-pokemon-id")
      ).toHaveTextContent(`${pokemonCount + 1 + 1}`);
    });

    it("retrieves all types", () => {
      expect(component?.getByTestId("get-all-types")).toHaveTextContent(
        `grass poison fire`
      );
    });
  });

  describe("PokemonContext Async Fetch", () => {
    it("renders Pokemon image after fetching", async () => {
      let component: RenderResult | undefined;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ sprites: { front_default: "url" } });
            }, 100);
          }),
      });

      await act(async () => {
        component = render(
          <PokemonProvider client={mockApolloClient}>
            <TestComponentImg />
          </PokemonProvider>
        );
      });

      expect(
        component?.getByTestId("get-random-pokemon-img")
      ).toHaveTextContent("Loading...");
      await waitFor(
        () => {
          expect(
            component?.getByTestId("get-random-pokemon-img")
          ).toHaveTextContent("url");
        },
        { timeout: 300 }
      );
    });
  });


});

const TestComponentContextOperations = () => {
  const {
    getAllPokemon,
    getPokemonById,
    getAllSessionPokemon,
    getNextFreeId,
    allTypes,
  } = usePokemonContext();
  const allPokemon = getAllPokemon();
  
  return (
    <>
      <div data-testid="get-all-pokemons">
        {allPokemon.map((pokemon) => pokemon.name + " ")}
      </div>
      <div data-testid="get-pokemon-by-id">{getPokemonById(2)?.name}</div>
      <div data-testid="get-all-session-pokemon">
        {getAllSessionPokemon()[0].name}
      </div>
      <div data-testid="get-next-free-pokemon-id">{getNextFreeId()}</div>
      <div data-testid="get-all-types">
        {allTypes.map((type) => type + " ")}
        
      </div>
    </>
  );
};

const TestComponentImg = () => {
  const { getRandomPokemonImage } = usePokemonContext();
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  useEffect(() => {
    getRandomPokemonImage().then((img: string) => {
      setPokemonImage(img);
    });
  }, []);

  return (
    <div data-testid="get-random-pokemon-img">
      {pokemonImage ? pokemonImage : <>Loading...</>}
    </div>
  );
};

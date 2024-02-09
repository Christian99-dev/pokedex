// PokemonContext.test.tsx

import React from "react";
import { act, render } from "@testing-library/react";
import { PokemonProvider, usePokemonContext } from "@/context/PokemonContext";
import mockApolloClient from "@/mocks/apolloMocks";

describe("PokemonContext", () => {
  it("renders PokemonContext without errors", async () => {
    await act(async () => {
      render(
        <PokemonProvider client={mockApolloClient}>
          <div />
        </PokemonProvider>
      );
    });
  });

  it("gets All Pokemons from Context", async () => {
    await act(async () => {
      render(
        <PokemonProvider client={mockApolloClient}>
          <TestComponent />
        </PokemonProvider>
      );
    });
  });
});

const TestComponent = () => {
  const { getAllPokemon } = usePokemonContext();
  console.log(getAllPokemon());
  return <></>;
};

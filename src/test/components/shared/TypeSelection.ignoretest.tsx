import React from "react";
import { act, render, fireEvent, RenderResult, screen } from "@testing-library/react";
import { PokemonProvider, usePokemonContext } from "@/context/PokemonContext";
import mockApolloClient from "@/mocks/apolloMockClient";
import mockSessionPokemon from "@/mocks/sessionPokemon.json";
import "@testing-library/jest-dom/jest-globals";
// import "@testing-library/jest-dom";
import { addPokemonToSession } from "@/utils/session";
import TypeSelection from "@/components/shared/TypeSelection";

describe("Context Components", () => {
  beforeAll(() => {
    addPokemonToSession(mockSessionPokemon);
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe("TypeSelection", () => {
    let component: RenderResult | undefined;

    beforeEach(async () => {
      await act(async () => {
        component = render(
          <PokemonProvider client={mockApolloClient}>
            <TypeSelectionWrapper />
          </PokemonProvider>
        );
      });
    });

    it("adds and removes types correctly", async () => {

      
      // Add a type
      fireEvent.click(component?.getByAltText("add-circle.svg") || new HTMLElement())
    
      // Hier findet er leider keine grass typen, obwohl in den anderen test der Context funktioniert
      expect(component?.getByText("grass")).toBeInTheDocument()

      //...
    });
  });
});

const TypeSelectionWrapper = () => {
  const [pokemon, setPokemon] = React.useState<string[]>([]);

  return <TypeSelection setState={setPokemon} state={pokemon} active={true} />;
};

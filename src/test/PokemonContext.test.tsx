import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { PokemonProvider, usePokemonContext, Pokemon } from '../context/PokemonContext';
import '@testing-library/jest-dom'; // Import this line


describe('PokemonProvider', () => {
  it('sollte die richtigen Pokemon-Daten zurückgeben, wenn nicht mehr geladen wird', async () => {
    const TestComponent = () => {
      const { getPokemonById, isLoading } = usePokemonContext();

      if (isLoading) {
        return <div data-testid="loading">Loading...</div>;
      }

      const pokemon: Pokemon | null | undefined = getPokemonById(1);

      return (
        <div>
          <div data-testid="pokemon-name">{pokemon?.name}</div>
          <div data-testid="pokemon-id">{pokemon?.id}</div>
        </div>
      );
    };

    const { getByTestId, queryByTestId } = render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    // Warte darauf, dass der Ladezustand beendet ist
    await waitFor(() => expect(queryByTestId('loading')).toBeNull());

    // Hier könnte man weitere Überprüfungen durchführen, abhängig von den erwarteten Daten
    expect(getByTestId('pokemon-name')).toHaveTextContent('Bulbasaur');
    expect(getByTestId('pokemon-id')).toHaveTextContent('1');
  });
});

// Import necessary dependencies for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonDisplay from '@/components/feature/pokedex/PokemonDisplay';

// Mock the required functions or dependencies
jest.mock('react-spinners', () => ({
  BounceLoader: () => <div>BounceLoader</div>,
}));


describe('PokemonDisplay Component', () => {
  it('renders PokemonDisplay component with provided Pokemon data', async () => {
    // Mock Pokemon data
    const mockPokemon = {
      id: 1,
      image: 'pokemon-image-url',
      name: 'Pikachu',
      types: ['Electric'],
      description: null,
      moves: [
        { name: 'Thunderbolt', type: 'Electric' },
        { name: 'Quick Attack', type: 'Normal' },
      ],
      weight: 6.0,
      base_experience: 112,
      height: 0.4,
      capture_rate: 45,
    };

    // Render the component with the provided Pokemon data
    render(
      <PokemonDisplay
        pokemon={mockPokemon}
        prevButton={() => {}}
        nextButton={() => {}}
      />
    );

    // Assertions
    expect(screen.getByAltText('Pikachu')).toBeInTheDocument();

    // Stats
    expect(screen.getByText('Höhe')).toBeInTheDocument();
    expect(screen.getByText('0.0 m')).toBeInTheDocument();

    expect(screen.getByText('Gewicht')).toBeInTheDocument();
    expect(screen.getByText('0.6 kg')).toBeInTheDocument();
    
    expect(screen.getByText('Basiserfahrung')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
    
    expect(screen.getByText('Fangrate')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();

    // Typen
    expect(screen.getByText('Electric')).toBeInTheDocument();
    
    // Attacken
    expect(screen.getByText('THUNDERBOLT')).toBeInTheDocument();
    expect(screen.getByText('QUICK ATTACK')).toBeInTheDocument();

    // Description
    expect(screen.getByText('Generate Description')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Random')).toBeInTheDocument();

    screen.debug()
  });
});

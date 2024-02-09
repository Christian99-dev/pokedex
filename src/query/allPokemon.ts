import { gql } from "@apollo/client";

export default (pokemonCount: number) => gql`
{
    pokemon_v2_pokemon(limit: ${pokemonCount}) {
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
        pokemon_v2_pokemonmoves(limit: 4) {
        pokemon_v2_move {
            name
            pokemon_v2_type {
            name
            }
        }
        }
        pokemon_v2_pokemonstats(limit: 1) {
        pokemon_v2_pokemon {
            base_experience
            height
            pokemon_v2_pokemonspecy {
            capture_rate
            }
        }
        }
        weight
    }
}`;

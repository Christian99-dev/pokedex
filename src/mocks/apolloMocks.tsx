import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { MockLink } from "@apollo/client/testing";
import ALL_POKEMON from "@/query/allPokemon";
import mockPokemonData from "@/mocks/allPokemonResponse.json";
import { pokemonCount } from "@/config/pokemonFetchCount";

const mockLink = new MockLink([
  {
    request: {
      query: ALL_POKEMON(pokemonCount), 
    },
    result: mockPokemonData,
  },
]);

const mockApolloClient = new ApolloClient({
  link: ApolloLink.from([mockLink]),
  cache: new InMemoryCache(),
});

export default mockApolloClient;

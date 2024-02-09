import type { AppProps } from "next/app";
import { PokemonProvider } from "../context/PokemonContext";
import Modal from "react-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '../utils/queryClient';
import { ApolloClient, InMemoryCache } from "@apollo/client";


Modal.setAppElement("#__next");
export default function App({ Component, pageProps }: AppProps) {

  const apolloClient = new ApolloClient({
    uri: "https://beta.pokeapi.co/graphql/v1beta",
    cache: new InMemoryCache(),
  });

  return (
    <PokemonProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PokemonProvider>
  );
}

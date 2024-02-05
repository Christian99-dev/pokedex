import type { AppProps } from "next/app";
import { PokemonProvider } from "../context/PokemonContext";
import Modal from "react-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '../utils/queryClient';


Modal.setAppElement("#__next");
export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokemonProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PokemonProvider>
  );
}

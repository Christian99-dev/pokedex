import type { AppProps } from "next/app";
import { PokemonProvider } from "../context/PokemonContext";
import Modal from "react-modal"; 
Modal.setAppElement('#__next');
export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokemonProvider>
      <Component {...pageProps} />
    </PokemonProvider>
  );
}

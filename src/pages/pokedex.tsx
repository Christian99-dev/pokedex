import Layout from "@/components/Layout";
import PokedexPreview from "@/components/PokedexPreview";
import { GetStaticProps } from "next";
import styled from "styled-components";

type PokemonData = {
  name: string;
  id: number;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
};

type PageProps = { data: PokemonData };

const Pokedex = ({ data }: { data: PokemonData }) => {
  const { name, id, types, sprites } = data;
  // console.log(name, id, types, sprites);

  return (
    <Layout>
      <PageWrapper>
        <div className="preview">
          <div className="search">
            <input placeholder="test" />
            <input placeholder="test" />
          </div>
          <div className="list">
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
            <PokedexPreview />
          </div>
        </div>
        <div className="details"></div>
      </PageWrapper>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
  const jsonData: PokemonData = await data.json();

  return {
    props: {
      data: jsonData,
    },
  };
};

export default Pokedex;

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;

  .details {
    width: 100%;
  }

  .preview {
    .search {
      padding: var(--space-xxl);
    }
    .list {
      overflow: scroll;
      height: 100%;
    }
  }
`;

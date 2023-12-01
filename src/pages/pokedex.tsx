import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import { GetStaticProps } from "next";
import styled from "styled-components";


type PokemonData = {
    name: string;
    id: number;
    types: Array<{ type: { name: string } }>;
    sprites: { front_default: string };
  };

  type PokedexProps = {
    data: PokemonData;
  };


  const Pokedex = ({ data }: PokedexProps) => {
    const { name, id, types, sprites } = data;
  
    return (
      <Layout>
        <PageWrapper>
          <div className="pokemon-card">
            <img src={sprites.front_default} alt={name} />
            <div className="pokemon-info">
              <h2>{name}</h2>
              <p>Number: {id}</p>
              <p>Type: {types.map((type) => type.type.name).join(", ")}</p>
            </div>
          </div>
        </PageWrapper>
      </Layout>
    );
  };
  
  export const getStaticProps: GetStaticProps<PokedexProps> = async () => {
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
  justify-content: center;
  align-items: center;
  height: 100%;


  .pokemon-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 150px;
    height: 150px;
  }

  .pokemon-info {
    padding: 16px;

    h1 {
        font-size: var(--fs-1);
        color: #4caf50;
        margin-bottom: var(--space-xl);;
      }
    
      h2 {
        font-size: var(--fs-2);
        margin: 0;
      }
    
      p {
        font-size: var(--fs-4);
        margin: 0;
      }
  }
`;
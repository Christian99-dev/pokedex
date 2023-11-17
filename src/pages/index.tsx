import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import { GetStaticProps } from "next";
import styled from "styled-components";


type PageProps = {
  data: any
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {

  const number = Math.random() * 100
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/100`);
  const jsonData = await data.json();
  return {
    props: {
      data: jsonData,
    },
  };
}


export default function Home({ data }: PageProps) {
  const { sprites: {
    front_default
  } } = data;

  return (
    <Layout>
      <PageWrapper>
        <img src={front_default} alt="pokemon" />
      </PageWrapper>
    </Layout>

  );
}

const PageWrapper = styled.div`
  gap: var(--space-xxl);
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  h1 {
    font-size: var(--fs-1);
    margin: 0;
  }

  h2 {
    font-size: var(--fs-2);
    margin: 0;
  }

  p {
    font-size: var(--fs-4);
    margin: 0;
  }

  .card {
    background-color: #845EC2;
    padding: 10px;
    width: 100%;
    color: white;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }

  img{
    height: 300px;
  }
`;

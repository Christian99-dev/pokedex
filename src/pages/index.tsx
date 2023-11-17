import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { device } from "@/theme/breakpoints";
import styled from "styled-components";

export default function Home() {
  return (
    <Layout>
      <PageWrapper>
        <Button text="Fight"/>
        <Button text="Pokedex"/>
      </PageWrapper>
    </Layout>
  );
}

const PageWrapper = styled.div`
  gap: var(--space-xxl);
  text-align: left;
  display: flex;
  align-items: center;
  
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
`;

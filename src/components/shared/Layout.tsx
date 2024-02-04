import GlobalStyle from "@/theme/globalStyles";
import Head from "next/head";
import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "@/components/shared/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <div className="viewheight-wrapper">
        <Header />
        {children}
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  .viewheight-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--dark);
  }
`;

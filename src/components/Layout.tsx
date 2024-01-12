import GlobalStyle from "@/theme/globalStyles";
import Head from "next/head";
import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "@/components/Header";

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
  background-color: var(--dark);

  .viewheight-wrapper{
    height: 100vh;
  }
`;

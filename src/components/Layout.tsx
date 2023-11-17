import GlobalStyle from "@/theme/globalStyles";
import Head from "next/head";
import React, { ReactNode } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div``;

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle/>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;

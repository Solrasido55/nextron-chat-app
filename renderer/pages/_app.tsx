import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeProvider, Global } from "@emotion/react";
import { AppProps } from "next/app";
import theme from "../styles/theme";
import global from "../styles/global";
import Nav from "../components/Nav";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

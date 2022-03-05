import { ThemeProvider } from "@emotion/react";
import React from "react";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import { darkTheme } from "./theme";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Header></Header>
      </ThemeProvider>
      <Home />
    </>
  );
};

export default App;

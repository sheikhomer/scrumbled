import { ThemeProvider } from "@emotion/react";
import React from "react";
import { Provider } from "react-redux";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import { store } from "./store";
import { darkTheme } from "./theme";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <Header></Header>
          <Home />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;

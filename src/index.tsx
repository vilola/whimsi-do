import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";

import {
  ChakraProvider,
  createStandaloneToast,
  extendTheme,
} from "@chakra-ui/react";

import App from "./App";
import { listTheme } from "./theme/components/List";

import "./index.css";

const { ToastContainer } = createStandaloneToast();

const container = document.getElementById("root")!;
const root = createRoot(container);

const theme = extendTheme({
  components: { List: listTheme },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

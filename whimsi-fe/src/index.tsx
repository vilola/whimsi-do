import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";

import {
  ChakraProvider,
  createStandaloneToast,
} from "@chakra-ui/react";

import App from "./App";

import "./index.css";

import { theme } from "./theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

const { ToastContainer } = createStandaloneToast();

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

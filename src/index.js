import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ChakraProvider>
     
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

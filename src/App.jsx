import React from "react";
import { Container } from "@mui/material";
import CurrencyConverter from "./CurrencyConverter";

function App() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#002a7f",
      }}
    >
      <CurrencyConverter />
    </Container>
  );
}

export default App;

import "./shared/styles/base.css";

import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU as dataGridRu } from "@mui/x-data-grid/locales";
import { ruRU as coreRu } from "@mui/material/locale";

import { Router } from "./router.tsx";
import { CursorEffect } from "./shared/ui";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Orbitron",
      h1: {
        fontSize: "32px",
      },
      h2: {
        fontSize: "16px",
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: "#0a0a1a",
        paper: "#111133",
      },
      text: {
        primary: "#f4f4f5",
      },
      divider: "#00bfff",
    },
  },
  dataGridRu,
  coreRu
);

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <CursorEffect />
    </ThemeProvider>
  </HashRouter>
);

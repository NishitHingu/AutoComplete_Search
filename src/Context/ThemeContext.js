import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [mode, setMode] = useState("light");
  const customTheme = createMuiTheme({
    palette: {
      type: mode === "dark" ? "dark" : "light",
      primary: {
        light: "#ff9723",
        dark: "#ff8830",
        main: "#ff8906",
        contrastText: "#fffffe",
      },
      text: {
        primary: mode === "dark" ? "#fffffe" : "#0f0e17",
        secondary: "#a7a9be",
        disabled: "rgba(15, 14, 23, 0.38)",
        hint: "rgba(15, 14, 23, 0.38)",
        divider: "rgba(15, 14, 23, 0.38)",
      },
      background: {
        default: mode === "dark" ? "#1a1d26" : "#fffffe",
        paper: mode === "dark" ? "#14131f" : "#f4f4f5",
      },
      sideBar: {
        background: "#0f0e17",
      },
      tags: {
        background: {
          0: "hsla(32,100%,47%, 0.2)",
          1: "hsla(4, 95%, 63%, 0.2)",
          2: "hsla(51, 100%, 51%, 0.2)",
        },
        text: {
          0: "hsl(32, 100%, 47%)",
          1: "hsl(4, 95%, 63%)",
          2: "hsl(51, 100%, 47%)",
        }
      },
    },
    overrides: {
      MuiDrawer: {
        root: {
          background: "#444",
        },
      },
    },
  });

  const toggleTheme = () => {
    let newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

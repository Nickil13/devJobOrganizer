import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Typography } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Typography variant="h1">Dev Job Organizer</Typography>
                <Button variant="contained">Hello World</Button>
            </div>
        </ThemeProvider>
    );
}

export default App;

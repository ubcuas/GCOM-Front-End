import { Route, Switch } from "wouter";
import Home from "./routes/Home";
import Nav from "./components/Nav";
import Telemetry from "./routes/Telemetry";
import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Nav />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/telemetry" component={Telemetry} />
                </Switch>
            </Box>
        </ThemeProvider>
    );
}

export default App;

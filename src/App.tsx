import { Route, Switch } from "wouter";
import Home from "./routes/Home";
import Nav from "./components/Nav";
import Telemetry from "./routes/Telemetry";
import { Box, CssBaseline, ThemeProvider, createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    palette: {
                        mode: prefersDarkMode ? "dark" : "light",
                        background: {
                            paper: "#040f16",
                            default: "#040f16",
                        },
                        primary: {
                            main: "#2DA0DC",
                        },
                    },
                    typography: {
                        fontFamily: [
                            '"Inter"',
                            "-apple-system",
                            "BlinkMacSystemFont",
                            '"Segoe UI"',
                            "Roboto",
                            '"Helvetica Neue"',
                            "Arial",
                            "sans-serif",
                            '"Apple Color Emoji"',
                            '"Segoe UI Emoji"',
                            '"Segoe UI Symbol"',
                        ].join(","),
                    },
                }),
            ),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    minwidth: "100vw",
                    minHeight: "100vh",
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

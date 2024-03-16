import { Route, Switch } from "wouter";
import Home from "./routes/Home";
import Nav from "./components/Nav";
import Telemetry from "./routes/Telemetry";
import { Box, CssBaseline, ThemeProvider, createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import Settings from "./routes/Settings";

function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    components: {
                        MuiTab: {
                            styleOverrides: {
                                root: {
                                    color: "white",
                                    "&.Mui-selected": {
                                        color: "#2DA0DC",
                                    },
                                },
                            },
                        },
                        MuiTextField: {
                            styleOverrides: {
                                root: ({ theme }) =>
                                    theme.unstable_sx({
                                        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                                            WebkitAppearance: "none",
                                            margin: 0,
                                        },
                                        "input[type=number]": {
                                            MozAppearance: "textfield",
                                        },
                                    }),
                            },
                        },
                    },
                    palette: {
                        mode: prefersDarkMode ? "dark" : "light",
                        background: {
                            paper: "#040f16",
                            default: "#040f16",
                        },
                        primary: {
                            main: "#2DA0DC",
                        },
                        secondary: {
                            main: "#2CDCA0",
                        },
                    },
                    typography: {
                        fontSize: 12,
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
                    colorScheme: "dark",
                }}
            >
                <Nav />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/telemetry" component={Telemetry} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </Box>
        </ThemeProvider>
    );
}

export default App;

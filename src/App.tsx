import { Box, CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { useMemo } from "react";
import { Route, Switch } from "wouter";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Settings from "./routes/Settings";
import Telemetry from "./routes/Telemetry";
import { selectPreferredTheme } from "./store/slices/appSlice";
import { useAppSelector } from "./store/store";

function App() {
    const colorScheme = useAppSelector(selectPreferredTheme);
    const isDark = colorScheme === "dark";

    const theme = useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    components: {
                        MuiTab: {
                            styleOverrides: {
                                root: {
                                    color: isDark ? "white" : "black",
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
                        mode: colorScheme,
                        background: {
                            paper: isDark ? "#040f16" : "#eef0f2",
                            default: isDark ? "#040f16" : "#f1f3f4",
                        },
                        primary: {
                            main: "#2DA0DC",
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
        [colorScheme],
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

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Switch, Route } from "wouter";
import { MapProvider } from "react-map-gl";
import { useAppSelector } from "./store";
import { selectThemeOptions } from "./store/slices/userOptionsSlice";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import Settings from "./pages/Settings";

const App: React.FC = () => {
    const themeOptions = useAppSelector(selectThemeOptions);
    const theme = createTheme({
        ...themeOptions,
        typography: { h4: { fontWeight: 500 } },
    });

    return (
        <ThemeProvider theme={theme}>
            <MapProvider>
                <CssBaseline />
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/map" component={MapView} />
                    <Route path="/settings" component={Settings} />
                    <Route>404 Not Found</Route>
                </Switch>
            </MapProvider>
        </ThemeProvider>
    );
};

export default App;

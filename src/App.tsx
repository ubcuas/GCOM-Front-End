import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch, Route, useLocation } from "wouter";
import { MapProvider } from "react-map-gl";
import { useAppSelector } from "./store";
import { selectTheme } from "./store/slices/userOptionsSlice";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MapView from "./pages/MapView";

import "mapbox-gl/dist/mapbox-gl.css";

const App: React.FC = () => {
    const { mode } = useAppSelector(selectTheme);
    const [theme, setTheme] = useState(createTheme({ palette: { mode: mode } }));

    useEffect(() => {
        setTheme(createTheme({ palette: { mode: mode } }));
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <MapProvider>
                <CssBaseline />
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/map" component={MapView} />
                    <Route>404 Not Found</Route>
                </Switch>
            </MapProvider>
        </ThemeProvider>
    );
};

export default App;

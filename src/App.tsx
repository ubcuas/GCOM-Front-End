import { Route, Switch } from "wouter";
import Home from "./routes/Home";
import Nav from "./components/Nav";
import Telemetry from "./routes/Telemetry";
import { Box } from "@mui/material";

function App() {
    return (
        <>
            <Box display="flex" height="100vh" width="100vw">
                <Nav />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/telemetry" component={Telemetry} />
                </Switch>
            </Box>
        </>
    );
}

export default App;

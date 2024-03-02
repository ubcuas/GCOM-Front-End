import { Grid } from "@mui/material";
import DroneStatus from "../components/DroneStatus";
import WaypointStatus from "../components/WaypointStatus";

export default function Telemetry() {
    return (
        <Grid
            sx={{
                padding: 8,
            }}
            container
            spacing={4}
        >
            <Grid item xs={6} md={4}>
                <DroneStatus />
            </Grid>
            <Grid item xs={6} md={8}>
                <WaypointStatus />
            </Grid>
        </Grid>
    );
}

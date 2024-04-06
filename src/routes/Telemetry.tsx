import { Grid } from "@mui/material";
import DroneStatusCard from "../components/DroneStatusCard";
import WaypointStatus from "../components/WaypointStatusCard";

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
                <DroneStatusCard />
            </Grid>
            <Grid item xs={6} md={8}>
                <WaypointStatus />
            </Grid>
        </Grid>
    );
}

import { Box, Grid } from "@mui/material";
import DroneStatusCard from "../components/DroneStatusCard";

export default function Telemetry() {
    return (
        <Box
            sx={{
                p: 8,
                flexGrow: 1,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    height: "100%",
                }}
            >
                <Grid item md={4}></Grid>
                <Grid item md={8}></Grid>
            </Grid>
        </Box>
    );
}

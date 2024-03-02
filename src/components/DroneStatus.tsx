import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";
import { selectAircraftStatus } from "../store/slices/dataSlice";

export default function DroneStatus() {
    const droneState = useAppSelector(selectAircraftStatus);

    return (
        <Paper
            sx={{
                height: "100%",
            }}
        >
            <Typography variant="h5">Drone Status</Typography>
        </Paper>
    );
}

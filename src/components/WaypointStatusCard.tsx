import { Alert, Fade, Grid, IconButton, Snackbar, Stack } from "@mui/material";
import { clearQueuedWaypoints, removeOneFromWaypoints, selectQueuedWaypoints } from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { postWaypointsToServer } from "../utils/api";
import InfoCard from "./InfoCard";
import WaypointForm from "./WaypointStatus/WaypointForm";
import WaypointItem from "./WaypointStatus/WaypointItem";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function WaypointStatus() {
    const dispatch = useAppDispatch();
    const waypointQueue = useAppSelector(selectQueuedWaypoints);

    const [snackbar, setSnackbar] = useState("");
    const [open, setOpen] = useState(false);

    const handlePost = async () => {
        if (waypointQueue.length === 0) {
            return;
        }
        try {
            await postWaypointsToServer(waypointQueue);
            dispatch(clearQueuedWaypoints());
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            setSnackbar(message);
            setOpen(true);
        }
    };

    const handleDeleteWaypoint = (index: number) => {
        dispatch(removeOneFromWaypoints(index));
    };

    return (
        <InfoCard title="Create Waypoints" rightButtonHandler={handlePost} rightButtonText="post">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack
                        spacing={2}
                        sx={{
                            maxHeight: "70vh",
                            overflowY: "auto",
                            p: 1,
                        }}
                    >
                        {waypointQueue.map((waypoint, index) => {
                            return (
                                <WaypointItem
                                    key={index}
                                    waypoint={waypoint}
                                    handleDelete={() => handleDeleteWaypoint(index)}
                                />
                            );
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <WaypointForm />
                </Grid>
            </Grid>
            <Snackbar TransitionComponent={Fade} open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
                <Alert
                    severity="error"
                    variant="filled"
                    action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {snackbar}
                </Alert>
            </Snackbar>
        </InfoCard>
    );
}

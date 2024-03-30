import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button, Fade, Grid, IconButton, Modal, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { postWaypointsToServer } from "../api/waypointEndpoints";
import { clearQueuedWaypoints, removeOneFromWaypoints, selectQueuedWaypoints } from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import InfoCard from "./InfoCard";
import WaypointForm from "./WaypointStatus/WaypointForm";
import WaypointItem from "./WaypointStatus/WaypointItem";
import ErrorSnackbar, { SnackbarState } from "./ErrorSnackbar";

export default function WaypointCreate() {
    const dispatch = useAppDispatch();
    const waypointQueue = useAppSelector(selectQueuedWaypoints);

    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        message: "",
        armed: false,
    });
    const [modalOpen, setModalOpen] = useState(false);

    const handlePost = async () => {
        if (waypointQueue.length === 0) {
            return;
        }
        try {
            await postWaypointsToServer(waypointQueue, true);
            dispatch(clearQueuedWaypoints());
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            setSnackbarState({ message, armed: true });
        }
    };

    const handleDeleteWaypoint = (index: number) => {
        dispatch(removeOneFromWaypoints(index));
    };

    return (
        <>
            <InfoCard title="Create Waypoints" rightButtonHandler={handlePost} rightButtonText="post">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <Stack
                            spacing={2}
                            sx={{
                                maxHeight: "73vh", // good enough of a value
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
                        <Stack
                            sx={{
                                height: "100%",
                            }}
                            justifyContent={"space-between"}
                        >
                            <WaypointForm />
                            <Button color="error" variant="outlined" fullWidth onClick={() => setModalOpen(true)}>
                                Delete ALL Queued Waypoints
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </InfoCard>
            <ErrorSnackbar
                message={snackbarState.message}
                open={snackbarState.armed}
                setOpen={(armed) => setSnackbarState({ ...snackbarState, armed })}
            />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Paper
                    elevation={2}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        p: 4,
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
                        Are you sure you want to delete all queued waypoints? <br />
                        This action cannot be undone.
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                            dispatch(clearQueuedWaypoints());
                            setModalOpen(false);
                        }}
                    >
                        Yes
                    </Button>
                </Paper>
            </Modal>
        </>
    );
}

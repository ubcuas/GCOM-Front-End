import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Button,
    Container,
    Fade,
    Grid,
    IconButton,
    Modal,
    Paper,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { clearQueuedWaypoints, removeOneFromWaypoints, selectQueuedWaypoints } from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { postWaypointsToServer } from "../api/WaypointEndpoints";
import InfoCard from "./InfoCard";
import WaypointForm from "./WaypointStatus/WaypointForm";
import WaypointItem from "./WaypointStatus/WaypointItem";

export default function WaypointCreate() {
    const dispatch = useAppDispatch();
    const waypointQueue = useAppSelector(selectQueuedWaypoints);

    const [snackbar, setSnackbar] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
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

import { Box, Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { postWaypointsToDrone } from "../api/droneEndpoints";
import {
    clearQueuedWaypoints,
    openSnackbar,
    removeOneFromWaypoints,
    selectAutoClearWaypoints,
    selectMapViewOpen,
    selectQueuedWaypoints,
    setMapViewOpen,
    setQueuedWaypoints,
} from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import InfoCard from "./InfoCard";
import WaypointCreationMap from "./Map/WaypointCreationMap";
import WaypointItem from "./WaypointItem";
import WaypointForm from "./WaypointStatus/WaypointForm";
import { Waypoint } from "../types/Waypoint";

export default function WaypointStatusCard() {
    const dispatch = useAppDispatch();
    const waypointQueue = useAppSelector(selectQueuedWaypoints);
    const autoClearWaypoints = useAppSelector(selectAutoClearWaypoints);
    const mapViewOpen = useAppSelector(selectMapViewOpen);
    const [modalOpen, setModalOpen] = useState(false);

    console.log("waypointQueue", waypointQueue);

    useEffect(() => {
        console.log("WaypointStatusCard useEffect");
        const storedQueue = localStorage.getItem("waypointQueue");
        if (storedQueue && storedQueue !== "[]") {
            dispatch(setQueuedWaypoints(JSON.parse(storedQueue) as Waypoint[]));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("waypointQueue", JSON.stringify(waypointQueue));
    }, [waypointQueue]);

    const handlePost = async () => {
        if (waypointQueue.length === 0) {
            return;
        }
        try {
            await postWaypointsToDrone(waypointQueue);
            if (autoClearWaypoints) {
                dispatch(clearQueuedWaypoints());
            }
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            dispatch(openSnackbar(message));
        }
    };

    const handleDeleteWaypoint = (index: number) => {
        dispatch(removeOneFromWaypoints(index));
    };

    const postButton = (
        <Box
            sx={{
                display: "flex",
                p: 1,
                gap: 1,
            }}
        >
            <Button
                sx={{ fontSize: 16, fontWeight: "bold", px: 4 }}
                variant="outlined"
                onClick={() => dispatch(setMapViewOpen(!mapViewOpen))}
            >
                Map View
            </Button>
            <Button sx={{ fontSize: 16, fontWeight: "bold", px: 4 }} variant="outlined" onClick={handlePost}>
                POST
            </Button>
        </Box>
    );

    return (
        <>
            <InfoCard title="Create Waypoints" rightNode={postButton}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Grid item xs={12} md={6}>
                        {mapViewOpen ? (
                            <WaypointCreationMap />
                        ) : waypointQueue.length === 0 ? (
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" sx={{ textAlign: "center" }}>
                                    No waypoints queued
                                </Typography>
                            </Box>
                        ) : (
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
                        )}
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

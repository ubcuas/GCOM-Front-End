import { Box, Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { getWaypointsQuery } from "../api/endpoints";
import {
    openSnackbar,
    selectAutoClearWaypoints,
    selectMapViewOpen,
    selectWaypoints,
    setMapViewOpen,
} from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Waypoint, WaypointEditState } from "../types/Waypoint";
import InfoCard from "./InfoCard";
import WaypointCreationMap from "./Map/WaypointCreationMap";
import WaypointItem from "./WaypointItem";
import WaypointForm from "./WaypointStatus/WaypointForm";
import { useWaypoints } from "../utils/useWaypoints";

export default function WaypointStatusCard() {
    const dispatch = useAppDispatch();
    const mapViewOpen = useAppSelector(selectMapViewOpen);
    const [modalOpen, setModalOpen] = useState(false);
    const { waypoints, createWaypoint, deleteWaypoint, editWaypoint, clearWaypoints } = useWaypoints();
    const [editState, setEditState] = useState<WaypointEditState>({
        index: -1,
        waypoint: undefined,
    });
    const isEditing = editState.waypoint != undefined;

    const handleDeleteWaypoint = (index: number) => {
        const waypointId = waypoints?.[index].id;
        if (waypointId) {
            deleteWaypoint(waypointId);
            clearEditState();
        }
    };

    // Handles editing a waypoint
    // Used by both waypoint map and list
    const startWaypointEditing = (index: number) => {
        setEditState({
            index,
            waypoint: waypoints?.[index],
        });
    };
    const clearEditState = () => {
        setEditState({
            index: -1,
            waypoint: undefined,
        });
    };

    // This could be for editing an existing waypoint or creating a new one
    const handleSubmitWaypointForm = (waypoint: Waypoint) => {
        if (isEditing) {
            waypoint.id = editState.waypoint!.id;
            editWaypoint(waypoint);
            clearEditState();
        } else {
            createWaypoint(waypoint);
        }
    };

    const rightButtons = (
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
                {mapViewOpen ? "List View" : "Map View"}
            </Button>
        </Box>
    );

    return (
        <>
            <InfoCard title="Create Waypoints" rightNode={rightButtons}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Grid item xs={12} md={6}>
                        {mapViewOpen ? (
                            <WaypointCreationMap
                                handleDelete={handleDeleteWaypoint}
                                startEditing={startWaypointEditing}
                                editingIndex={editState.index}
                                submitWaypoint={handleSubmitWaypointForm}
                                setEditingCoords={({ lat, long }: { lat: number; long: number }) => {
                                    setEditState((curr) => ({
                                        ...curr,
                                        waypoint: curr.waypoint && {
                                            ...curr.waypoint,
                                            lat,
                                            long,
                                        },
                                    }));
                                }}
                            />
                        ) : waypoints?.length === 0 ? (
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
                                {!waypoints ? (
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                                        Loading waypoints...
                                    </Typography>
                                ) : (
                                    waypoints.map((waypoint, index) => {
                                        return (
                                            <WaypointItem
                                                key={index}
                                                waypoint={waypoint}
                                                sx={{
                                                    border: "4px solid",
                                                    borderColor:
                                                        index === editState.index ? "primary.main" : "transparent",
                                                }}
                                                handleDelete={() => handleDeleteWaypoint(index)}
                                                handleEdit={() => startWaypointEditing(index)}
                                            />
                                        );
                                    })
                                )}
                            </Stack>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack justifyContent={"space-between"}>
                            <WaypointForm
                                isEditing={isEditing}
                                cancelEditing={clearEditState}
                                submitForm={handleSubmitWaypointForm}
                                initialEditingState={editState.waypoint}
                            />
                            <Button
                                color="error"
                                variant="outlined"
                                fullWidth
                                onClick={() => setModalOpen(true)}
                                sx={{ my: 1 }}
                            >
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
                            clearWaypoints();
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

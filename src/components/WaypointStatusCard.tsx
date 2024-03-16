import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addToQueuedWaypoints, clearQueuedWaypoints, selectQueuedWaypoints } from "../store/slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import InfoCard from "./InfoCard";
import WaypointItem from "./WaypointStatus/WaypointItem";
import { postWaypointsToServer } from "../utils/api";
import { Designation, Waypoint } from "../types/Waypoint";

export default function WaypointStatus() {
    const dispatch = useAppDispatch();
    const waypointQueue = useAppSelector(selectQueuedWaypoints);
    const [formState, setFormState] = useState({
        latitude: "",
        longitude: "",
        altitude: "",
        name: "",
        radius: "",
        remarks: "",
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        });
    };

    const handleFormSubmit = () => {
        if (formState.latitude && formState.longitude && formState.altitude) {
            const waypoint = {
                lat: parseFloat(formState.latitude),
                long: parseFloat(formState.longitude),
                alt: parseFloat(formState.altitude),
                name: formState.name,
                radius: parseFloat(formState.radius),
                remarks: formState.remarks,
                id: "-1",
            } as Waypoint;
            dispatch(addToQueuedWaypoints(waypoint));
        }
    };

    const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
        if (e.target instanceof HTMLElement) {
            e.target.blur();
        }
    };

    const handlePost = () => {
        if (waypointQueue.length === 0) {
            return;
        }
        postWaypointsToServer(waypointQueue);
        dispatch(clearQueuedWaypoints());
    };

    return (
        <InfoCard title="Waypoints" waypointSubmit={handlePost}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack
                        spacing={2}
                        sx={{
                            maxHeight: "540px",
                            overflowY: "auto",
                        }}
                    >
                        {waypointQueue.map((waypoint, index) => {
                            return <WaypointItem key={index} waypoint={waypoint} />;
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Create Waypoint</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                required
                                id="longitude"
                                type="number"
                                label="Longitude"
                                onChange={handleFormChange}
                                onWheel={preventScroll}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                required
                                id="latitude"
                                type="number"
                                label="Latitude"
                                onChange={handleFormChange}
                                onWheel={preventScroll}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                required
                                id="altitude"
                                type="number"
                                label="Altitude"
                                onChange={handleFormChange}
                                onWheel={preventScroll}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="radius"
                                type="number"
                                label="Radius"
                                onChange={handleFormChange}
                                onWheel={preventScroll}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Name"
                                autoComplete="off"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="remarks"
                                label="Remarks"
                                autoComplete="off"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{
                                    width: "100%",
                                }}
                                variant="contained"
                                onClick={handleFormSubmit}
                            >
                                Create Waypoint
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </InfoCard>
    );
}

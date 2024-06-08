import { Box, Button, Paper, Stack, Switch, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getWaypoints } from "../store/thunks/dataThunks";
import { selectMPSWaypoints } from "../store/slices/dataSlice";
import WaypointItem from "../components/WaypointItem";
import { useRef } from "react";

export default function MPSQueue() {
    const dispatch = useAppDispatch();
    const mpsQueueWaypoints = useAppSelector(selectMPSWaypoints);
    const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleAutoFetch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            fetchIntervalRef.current = setInterval(fetchFromMPSQueue, 1000);
        } else if (fetchIntervalRef.current) {
            clearInterval(fetchIntervalRef.current);
        }
    };

    const fetchFromMPSQueue = () => {
        console.log("Fetching from MPS queue...");
        dispatch(getWaypoints);
    };

    return (
        <Box
            sx={{
                p: 8,
                m: "auto",
                width: "100%",
                maxWidth: 600,
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    MPS Queue
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Button onClick={fetchFromMPSQueue} fullWidth variant="outlined">
                        FETCH
                    </Button>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 2,
                            justifyContent: "flex-end",
                            flexShrink: 0,
                        }}
                    >
                        <Typography>Auto Fetch: </Typography>
                        <Switch onChange={handleAutoFetch} />
                    </Stack>
                </Stack>
                {mpsQueueWaypoints.map((waypoint, index) => (
                    <WaypointItem key={index} waypoint={waypoint} />
                ))}
            </Paper>
        </Box>
    );
}

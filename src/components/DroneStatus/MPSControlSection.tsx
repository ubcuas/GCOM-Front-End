import { Box, Button, Divider, Modal, Paper, Switch, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { armDrone, disarmDrone, takeoffDrone } from "../../api/droneEndpoints";
import { openSnackbar, selectBypassStatus, setAllMpsWaypointMapState } from "../../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getMPSQueue, getWaypoints } from "../../store/thunks/dataThunks";

export default function MPSControlSection() {
    const [controlState, setControlState] = useState({
        armed: false,
        takeoffAltitude: 0,
    });
    const [modalState, setModalState] = useState(false);
    const dispatch = useAppDispatch();
    const isBypassed = useAppSelector(selectBypassStatus);
    const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleArming = async (arming: boolean) => {
        try {
            arming ? await armDrone() : await disarmDrone();
            setControlState({ ...controlState, armed: arming });
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            dispatch(openSnackbar(message));
        }
    };

    const updateSnackBarState = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (["altitude"].includes(event.target.id) && /[^0-9.-]/.test(event.target.value)) {
            return;
        }
        setControlState({ ...controlState, takeoffAltitude: parseFloat(event.target.value) });
    };

    const handleTakeoff = async (altitude?: number) => {
        try {
            if (!controlState.armed && !isBypassed) {
                dispatch(
                    openSnackbar("Drone must be armed before takeoff! You can disable this option in the settings."),
                );
            }
            await takeoffDrone(altitude);
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            openSnackbar(message);
        }
    };

    const handleAutoFetch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            fetchIntervalRef.current = setInterval(fetchFromMPSQueue, 1000);
        } else if (fetchIntervalRef.current) {
            clearInterval(fetchIntervalRef.current);
        }
    };

    const fetchFromMPSQueue = () => {
        console.log("Fetching from MPS queue...");
        dispatch(getMPSQueue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box>
                {controlState.armed ? (
                    <Button fullWidth variant="outlined" color="success" onClick={() => handleArming(false)}>
                        Disarm Drone
                    </Button>
                ) : (
                    <Button fullWidth variant="outlined" color="error" onClick={() => setModalState(true)}>
                        Arm Drone
                    </Button>
                )}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    gap: 2,
                }}
            >
                <TextField
                    size="small"
                    required
                    id="takeoffAltitude"
                    type="number"
                    label="Take Off Altitude (ft)"
                    onChange={updateSnackBarState}
                    value={controlState.takeoffAltitude === 0 ? "" : controlState.takeoffAltitude}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        handleTakeoff(controlState.takeoffAltitude);
                    }}
                >
                    Takeoff
                </Button>
            </Box>
            <Divider />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <Button variant="outlined" onClick={() => dispatch(setAllMpsWaypointMapState(true))}>
                    Show All Waypoints
                </Button>
                <Button variant="outlined" onClick={() => dispatch(setAllMpsWaypointMapState(false))}>
                    Hide All Waypoints
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <Button
                        sx={{
                            flexGrow: 1,
                        }}
                        variant="outlined"
                        color="success"
                        onClick={() => dispatch(getMPSQueue)}
                    >
                        Fetch MPS Data
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Auto Fetch
                        <Switch onChange={handleAutoFetch} />
                    </Box>
                </Box>
            </Box>
            <Modal open={modalState} onClose={() => setModalState(false)}>
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
                        Are you sure you are ready to arm?
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleArming(true);
                            setModalState(false);
                        }}
                    >
                        Yes
                    </Button>
                </Paper>
            </Modal>
        </Box>
    );
}

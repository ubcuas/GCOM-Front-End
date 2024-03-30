import { Alert, Button, Grid, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import { armDrone, disarmDrone, takeoffDrone } from "../../api/droneEndpoints";
import { useState } from "react";
import ErrorSnackbar, { SnackbarState } from "../ErrorSnackbar";

export default function MPSControlSection() {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        message: "",
        armed: false,
        takeoffAltitude: 0,
    });

    const handleArming = async (arming: boolean) => {
        try {
            arming ? await armDrone() : await disarmDrone();
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            setSnackbarState({ message, armed: true });
        }
    };

    const updateSnackBarState = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (["altitude"].includes(event.target.id) && /[^0-9.-]/.test(event.target.value)) {
            return;
        }
        setSnackbarState({
            ...snackbarState,
            [event.target.id]: event.target.value,
        });
    };

    const handleTakeoff = async (altitude?: number) => {
        try {
            if (!snackbarState.armed) {
                console.log("Please arm the drone.");
            }
            await takeoffDrone(altitude);
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            setSnackbarState({ message, armed: true });
        }
    };

    return (
        <>
            <Stack spacing={2}>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Button fullWidth variant="outlined" color="error" onClick={() => handleArming(true)}>
                            Arm Drone
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button fullWidth variant="outlined" color="success" onClick={() => handleArming(false)}>
                            Disarm Drone
                        </Button>
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    required
                    id="takeoffAltitude"
                    type="number"
                    label="Take Off Altitude (ft)"
                    onChange={updateSnackBarState}
                    value={snackbarState.takeoffAltitude === 0 ? "" : snackbarState.takeoffAltitude}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                        handleTakeoff(snackbarState.takeoffAltitude);
                    }}
                >
                    {"Takeoff"}
                </Button>
            </Stack>
            <ErrorSnackbar
                message={snackbarState.message}
                open={snackbarState.armed}
                setOpen={(armed) => setSnackbarState({ ...snackbarState, armed })}
            />
        </>
    );
}

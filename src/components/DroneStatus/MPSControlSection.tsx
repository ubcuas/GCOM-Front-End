import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { armDrone, disarmDrone, takeoffDrone } from "../../api/droneEndpoints";
import { openSnackbar } from "../../store/slices/appSlice";
import { useAppDispatch } from "../../store/store";

export default function MPSControlSection() {
    const [controlState, setControlState] = useState({
        armed: false,
        takeoffAltitude: 0,
    });
    const dispatch = useAppDispatch();

    const handleArming = async (arming: boolean) => {
        try {
            arming ? await armDrone() : await disarmDrone();
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
            if (!controlState.armed) {
                console.log("Please arm the drone.");
            }
            await takeoffDrone(altitude);
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            openSnackbar(message);
        }
    };

    return (
        <Grid container direction="row" spacing={2}>
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
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    size="small"
                    required
                    id="takeoffAltitude"
                    type="number"
                    label="Take Off Altitude (ft)"
                    onChange={updateSnackBarState}
                    value={controlState.takeoffAltitude === 0 ? "" : controlState.takeoffAltitude}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    sx={{ height: "100%" }}
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                        handleTakeoff(controlState.takeoffAltitude);
                    }}
                >
                    Takeoff
                </Button>
            </Grid>
        </Grid>
    );
}

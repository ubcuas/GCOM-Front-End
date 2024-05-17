import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { armDrone, disarmDrone, takeoffDrone } from "../../api/droneEndpoints";
import { openSnackbar } from "../../store/slices/appSlice";
import { useAppDispatch } from "../../store/store";

export default function MPSControlSection() {
    const [controlState, setControlState] = useState({
        armed: false,
        takeoffAltitude: 0,
    });
    const [modalState, setModalState] = useState(false);
    const dispatch = useAppDispatch();

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
            // if (!controlState.armed) {
            //     console.log("Please arm the drone.");
            // }
            await takeoffDrone(altitude);
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            openSnackbar(message);
        }
    };

    return (
        <>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    {controlState.armed ? (
                        <Button fullWidth variant="outlined" color="success" onClick={() => handleArming(false)}>
                            Disarm Drone
                        </Button>
                    ) : (
                        <Button fullWidth variant="outlined" color="error" onClick={() => setModalState(true)}>
                            Arm Drone
                        </Button>
                    )}
                </Grid>
                {/* <Grid item xs={12} md={6}>
                <Button fullWidth variant="outlined" color="success" onClick={() => handleArming(false)}>
                    Disarm Drone
                </Button>
            </Grid> */}
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
                        // disabled={controlState.armed ? false : true}
                        onClick={() => {
                            handleTakeoff(controlState.takeoffAltitude);
                        }}
                    >
                        Takeoff
                    </Button>
                </Grid>
            </Grid>
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
        </>
    );
}

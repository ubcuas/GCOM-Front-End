import { Alert, Button, Grid, IconButton, Snackbar } from "@mui/material";
import { armDrone, disarmDrone } from "../../api/droneEndpoints";
import { useState } from "react";
import ErrorSnackbar, { SnackbarState } from "../ErrorSnackbar";

export default function MPSControlSection() {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        message: "",
        open: false,
    });

    const handleArming = async (arming: boolean) => {
        try {
            arming ? await armDrone() : await disarmDrone();
        } catch (error) {
            const message = (error as Error).message;
            console.log(message);
            setSnackbarState({ message, open: true });
        }
    };

    return (
        <>
            <Grid container spacing={1}>
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
            <ErrorSnackbar
                message={snackbarState.message}
                open={snackbarState.open}
                setOpen={(open) => setSnackbarState({ ...snackbarState, open })}
            />
        </>
    );
}

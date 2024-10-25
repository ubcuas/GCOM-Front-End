import { Box, Button, Modal, Paper, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../api/api.ts";

export default function MPSControlSection() {
    const [clientSideState, setClientSideState] = useState({
        armed: false,
        takeoffAltitude: 0,
    });
    const [modalState, setModalState] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box>
                {clientSideState.armed ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            api.post("/drone/arm").then(() => (clientSideState.armed = false));
                        }}
                    >
                        Disarm Drone
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            setModalState(true);
                            api.post("/drone/arm").then(() => (clientSideState.armed = true));
                        }}
                    >
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
                    onChange={(e) => {
                        setClientSideState((prevState) => ({
                            ...prevState,
                            takeoffAltitude: parseFloat(e.target.value),
                        }));
                    }}
                    value={clientSideState.takeoffAltitude === 0 ? "" : clientSideState.takeoffAltitude}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        api.post("/drone/takeoff", { altitude: clientSideState.takeoffAltitude });
                    }}
                >
                    Takeoff
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <Button variant="outlined" onClick={() => {}}>
                    Show All Waypoints
                </Button>
                <Button variant="outlined" onClick={() => {}}>
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
                        onClick={() => {
                            api.get("/route");
                        }}
                    >
                        Fetch MPS Data
                    </Button>
                    {/* <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Auto Fetch
                        <Switch
                            onClick={() => {
                                // Functionality to auto fetch the mps queue on an interval, not sure if needed so commented out for now.
                            }}
                        />
                    </Box> */}
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
                            api.post("/drone/arm").then(() => (clientSideState.armed = true));
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

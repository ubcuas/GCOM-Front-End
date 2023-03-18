import { Box, Button, Card, css, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useZxing } from "react-zxing";
import { useAppSelector } from "../store";
import { selectScannerTimer } from "../store/slices/userOptionsSlice";
import TimerUtility from "../utils/TimerUtility";
import Dropdown from "../components/Dropdown";
import { SCANNER_ENDPOINTS } from "../utils/constants/endpoints";
import { useRoute } from "wouter";

const Scanner: React.FC = () => {
    // sometimes the scanner video feed doesn't pause/disable on page change
    //  handling manually instead
    const [match] = useRoute("/scanner");

    const [result, setResult] = useState("");
    const [isTimedOut, setIsTimedOut] = useState(false);
    const [endpointIndex, setEndpointIndex] = useState(0);
    const { ref } = useZxing({
        paused: !match,
        onResult: (result) => setResult(result.getText()),
    });

    const scannerTimeout = useAppSelector(selectScannerTimer);
    const { seconds, restart, pause, isRunning } = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false,
        onExpire: () => {
            send();
        },
    });

    const restartTimer = () => {
        setIsTimedOut(false);
        restart(TimerUtility.getExpiryInSeconds(scannerTimeout));
    };

    const cancelTimer = () => {
        pause();
    };

    const send = () => {
        cancelTimer();
        setIsTimedOut(true);
        // setEndpointIndex((endpointIndex + 1) % SCANNER_ENDPOINTS.length);
    };

    const clear = () => {
        cancelTimer();
        setResult("");
    };

    useEffect(() => {
        setIsTimedOut(false);
        if (result) restartTimer();
    }, [result]);

    return (
        <Stack direction="row" sx={{ height: "100%" }}>
            <Stack sx={{ width: "50%" }} alignItems="center" justifyContent="center">
                <video
                    ref={ref}
                    css={css`
                        max-width: 100%;
                    `}
                />
            </Stack>
            <Stack sx={{ width: "50%", height: "100%", padding: 3, justifyContent: "center" }}>
                <Box marginBottom={1} textAlign="right" height="40px">
                    {!!result && <Button onClick={clear}>Clear</Button>}
                </Box>
                <Card sx={{ height: "50%", padding: 2, overflowWrap: "break-word", overflowY: "auto" }}>
                    <Typography variant="body2">{result}</Typography>
                </Card>
                <Stack direction="row" justifyContent="space-between" marginTop={2}>
                    <Dropdown
                        id="scanner-endpoint"
                        label="Endpoint"
                        value={endpointIndex}
                        onChange={(value) => setEndpointIndex(value)}
                        sx={{ minWidth: "150px" }}
                    >
                        {SCANNER_ENDPOINTS.map((endpoint, index) => (
                            <MenuItem value={index}>{endpoint}</MenuItem>
                        ))}
                    </Dropdown>

                    <Stack direction="row" alignItems="center" gap={3}>
                        <Button variant="outlined" onClick={cancelTimer} disabled={!isRunning || isTimedOut}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={send} disabled={isTimedOut || !result}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
                <Typography variant="overline" textAlign="right" height="1em">
                    {isRunning && <div>sending in {seconds} seconds...</div>}
                    {isTimedOut && <div>Sent to endpoint: {SCANNER_ENDPOINTS[endpointIndex]}</div>}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Scanner;

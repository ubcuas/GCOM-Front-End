import { Box, Paper, SelectChangeEvent, Stack, Typography } from "@mui/material";
import SettingItem from "../components/SettingItem";
import {
    selectBypassStatus,
    selectPreferredTheme,
    selectSocketStatus,
    setBypassStatus,
    setPreferredTheme,
    setSocketStatus,
} from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useLocalStorage } from "../utils/useLocalStorage";
import { defaultCoords } from "../utils/defaultCoords";

export default function Settings() {
    const theme = useAppSelector(selectPreferredTheme);
    const socketStatus = useAppSelector(selectSocketStatus);
    const isBypassed = useAppSelector(selectBypassStatus);
    const [coords, setCoords] = useLocalStorage("coords", defaultCoords);
    const processedCoords = {
        long: isNaN(coords.long) || coords.long === null ? "" : String(coords.long),
        lat: isNaN(coords.lat) || coords.lat === null ? "" : String(coords.lat),
    };
    const dispatch = useAppDispatch();

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPreferredTheme(event.target.checked ? "dark" : "light"));
    };
    const handleSocketChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSocketStatus(event.target.checked));
    };
    const handleBypassChange = (event: SelectChangeEvent<string>) => {
        dispatch(setBypassStatus(event.target.value === "Bypassed"));
    };
    const handleDefaultCoordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!["latitude", "longitude"].includes(event.target.id) || /[^0-9.-]/.test(event.target.value)) {
            return;
        }
        event.target.id === "longitude" && setCoords({ ...coords, long: parseFloat(event.target.value) });
        event.target.id === "latitude" && setCoords({ ...coords, lat: parseFloat(event.target.value) });
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
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                    }}
                >
                    Settings
                </Typography>
                <Stack gap={1}>
                    <SettingItem
                        checked={theme === "dark"}
                        name="Dark Theme"
                        type="toggle"
                        onChange={handleThemeChange}
                    />
                    <SettingItem
                        checked={socketStatus}
                        name="Socket Telemetry"
                        type="toggle"
                        onChange={handleSocketChange}
                    />
                    <SettingItem
                        type="select"
                        name="Bypass Arming Restriction"
                        options={["Enforced", "Bypassed"]}
                        value={!isBypassed ? "Enforced" : "Bypassed"}
                        onChange={handleBypassChange}
                        optionColors={["", "error.dark"]}
                    />
                    <SettingItem
                        id="longitude"
                        type="text"
                        name="Map Default Center Longitude"
                        value={processedCoords.long}
                        onChange={handleDefaultCoordChange}
                    />
                    <SettingItem
                        id="latitude"
                        type="text"
                        name="Map Default Center Latitude"
                        value={processedCoords.lat}
                        onChange={handleDefaultCoordChange}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}

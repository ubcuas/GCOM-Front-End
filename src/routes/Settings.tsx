import { Box, Paper, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SettingItem from "../components/SettingItem";
import {
    selectAutoClearWaypoints,
    selectBypassStatus,
    selectPreferredTheme,
    selectSocketStatus,
    setAutoClearWaypoints,
    setBypassStatus,
    setPreferredTheme,
    setSocketStatus,
} from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { StringCoords } from "../types/Coords";
import { defaultCoords as hardCodeDefault } from "../utils/coords";

export default function Settings() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectPreferredTheme);
    const socketStatus = useAppSelector(selectSocketStatus);
    const isBypassed = useAppSelector(selectBypassStatus);
    const autoClearWaypoints = useAppSelector(selectAutoClearWaypoints);

    const localSavedCoordinates = localStorage.getItem("coords");
    const defaultCoords: StringCoords = localSavedCoordinates
        ? JSON.parse(localSavedCoordinates, (key, value) => (value ? value : ""))
        : { long: String(hardCodeDefault.long), lat: String(hardCodeDefault.lat) };
    const [coords, setCoords] = useState(defaultCoords);

    useEffect(() => {
        localStorage.setItem(
            "coords",
            JSON.stringify({
                long: parseFloat(coords.long),
                lat: parseFloat(coords.lat),
            }),
        );
    }, [coords]);

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPreferredTheme(event.target.checked ? "dark" : "light"));
    };
    const handleSocketChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSocketStatus(event.target.checked));
    };
    const handleBypassChange = (event: SelectChangeEvent<string>) => {
        dispatch(setBypassStatus(event.target.value === "Bypassed"));
    };
    const handleAutoClearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAutoClearWaypoints(event.target.checked));
    };
    const handleDefaultCoordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/[^0-9.-]/.test(event.target.value)) {
            return;
        }
        event.target.id === "longitude" && setCoords({ ...coords, long: event.target.value });
        event.target.id === "latitude" && setCoords({ ...coords, lat: event.target.value });
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
                        type="toggle"
                        name="Auto-Clear Posted WPs"
                        checked={autoClearWaypoints}
                        onChange={handleAutoClearChange}
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
                        value={coords.long}
                        onChange={handleDefaultCoordChange}
                    />
                    <SettingItem
                        id="latitude"
                        type="text"
                        name="Map Default Center Latitude"
                        value={coords.lat}
                        onChange={handleDefaultCoordChange}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}

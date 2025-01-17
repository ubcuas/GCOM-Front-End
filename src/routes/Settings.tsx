import { Box, Paper, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SettingItem from "../components/SettingItem";
import {
    selectAppSlice,
    setAutoClearWaypoints,
    setBypassStatus,
    setMapCenterCoords,
    setPreferredTheme,
    setSocketStatus,
} from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { StringCoords } from "../types/Coords";
import { checkLat, checkLong, validCoords } from "../utils/coords";

export default function Settings() {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectAppSlice);

    const [coords, setCoords] = useState<StringCoords>({
        lat: settings.mapCenterCoords.lat.toString(),
        long: settings.mapCenterCoords.long.toString(),
    });

    const getCoordError = (coords: StringCoords) => ({
        lat: !checkLat(parseFloat(coords.lat)),
        long: !checkLong(parseFloat(coords.long)),
    });

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
        // early return if the input is not a number
        if (/[^0-9.-]/.test(event.target.value)) {
            return;
        }
        // allow changes to input even if its not a valid coordinate
        const newCoords =
            event.target.id === "longitude"
                ? { ...coords, long: event.target.value }
                : { ...coords, lat: event.target.value };
        setCoords(newCoords);
        // ONLY update store coords if the input is a valid coordinate.
        const parsedCoords = { lat: parseFloat(newCoords.lat), long: parseFloat(newCoords.long) };
        if (validCoords(parsedCoords)) {
            dispatch(setMapCenterCoords(parsedCoords));
        }
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
                        checked={settings.preferredTheme === "dark"}
                        name="Dark Theme"
                        type="toggle"
                        onChange={handleThemeChange}
                    />
                    <SettingItem
                        checked={settings.telemetrySockets}
                        name="Socket Telemetry"
                        type="toggle"
                        onChange={handleSocketChange}
                    />
                    <SettingItem
                        type="toggle"
                        name="Auto-Clear Posted WPs"
                        checked={settings.autoClearWaypoints}
                        onChange={handleAutoClearChange}
                    />
                    <SettingItem
                        type="select"
                        name="Bypass Arming Restriction"
                        options={["Enforced", "Bypassed"]}
                        value={!settings.bypassArmingRestriction ? "Enforced" : "Bypassed"}
                        onChange={handleBypassChange}
                        optionColors={["", "error.dark"]}
                    />
                    <SettingItem
                        id="longitude"
                        type="text"
                        name="Map Default Center Longitude"
                        value={coords.long}
                        onChange={handleDefaultCoordChange}
                        error={getCoordError(coords).long}
                    />
                    <SettingItem
                        id="latitude"
                        type="text"
                        name="Map Default Center Latitude"
                        value={coords.lat}
                        onChange={handleDefaultCoordChange}
                        error={getCoordError(coords).lat}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}

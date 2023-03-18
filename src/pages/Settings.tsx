import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PageSection from "../components/PageSection";
import { useAppDispatch, useAppSelector } from "../store";
import {
    selectScannerTimer,
    selectThemeColor,
    selectThemeOptions,
    updateScannerTimer,
    updateThemeColor,
    updateThemeMode,
} from "../store/slices/userOptionsSlice";
import { ThemeColor, ThemeColorFamily, ThemeMode } from "../utils/constants/enums/theme";
import { useEffect, useState } from "react";

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const themeOptions = useAppSelector(selectThemeOptions);
    const themeColor = useAppSelector(selectThemeColor);
    const scannerTimer = useAppSelector(selectScannerTimer);
    // localScannerTimeout is to be handle and display errors
    const [localScannerTimer, setLocalScannerTimer] = useState(scannerTimer.toString());
    const [scannerTimerError, setScannerTimerError] = useState(false);

    useEffect(() => {
        if (localScannerTimer) dispatch(updateScannerTimer(parseInt(localScannerTimer)));
    }, [localScannerTimer]);

    return (
        <PageSection>
            <PageSection.Header>Settings</PageSection.Header>

            <PageSection.Subheader>Theme</PageSection.Subheader>
            <Stack direction="row" gap={5}>
                <ToggleButtonGroup
                    value={themeOptions.palette.mode}
                    onChange={(_event, value) => {
                        if (value && value !== null) {
                            dispatch(updateThemeMode(value));
                        }
                    }}
                    size="small"
                    exclusive
                >
                    <ToggleButton value={ThemeMode.Light}>
                        <LightModeIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value={ThemeMode.Dark}>
                        <DarkModeIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    value={themeColor}
                    onChange={(_event, value) => {
                        if (value && value !== null) {
                            dispatch(updateThemeColor(value));
                        }
                    }}
                    size="small"
                    exclusive
                >
                    {Object.values(ThemeColor).map((color) => (
                        <ToggleButton value={color} key={color}>
                            <Brightness1Icon
                                fontSize="small"
                                htmlColor={ThemeColorFamily[color as ThemeColor][themeOptions.palette.mode].main}
                            />
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            <PageSection.Subheader topMargin>Other</PageSection.Subheader>
            <TextField
                label="Scanner timer"
                error={scannerTimerError}
                sx={{ width: "150px" }}
                value={localScannerTimer}
                onChange={(e) => {
                    setLocalScannerTimer(e.target.value);
                    setScannerTimerError(!/^[0-9]+$/.test(e.target.value));
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
                }}
            />
        </PageSection>
    );
};

export default Settings;

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Box, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import PageSection from "../components/PageSection";
import { useAppDispatch, useAppSelector } from "../store";
import {
    selectThemeColor,
    selectThemeOptions,
    updateThemeColor,
    updateThemeMode,
} from "../store/slices/userOptionsSlice";
import { ThemeColor, ThemeColorFamily, ThemeMode } from "../utils/constants/enums/theme";

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const themeOptions = useAppSelector(selectThemeOptions);
    const themeColor = useAppSelector(selectThemeColor);
    const theme = useTheme();

    return (
        <PageSection height="90vh">
            <PageSection.Header>Settings</PageSection.Header>
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
            <br />
            <Box width="100px" height="100px" display="inline-block" sx={{ background: theme.palette.primary.light }} />
            <Box width="100px" height="100px" display="inline-block" sx={{ background: theme.palette.primary.main }} />
            <Box width="100px" height="100px" display="inline-block" sx={{ background: theme.palette.primary.dark }} />
        </PageSection>
    );
};

export default Settings;

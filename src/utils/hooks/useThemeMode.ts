import { useTheme } from "@mui/material";
import { ThemeMode } from "../constants/enums/theme";

const useThemeMode = () => {
    const theme = useTheme();

    const themeMode = theme.palette.mode;
    const isLightMode = themeMode === ThemeMode.Light;
    const isDarkMode = themeMode === ThemeMode.Dark;

    return { themeMode, isLightMode, isDarkMode };
};

export default useThemeMode;

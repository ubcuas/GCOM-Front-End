import { useTheme } from "@mui/material";
import { ThemeMode } from "../constants/enums/theme";

const useThemeMode = () => {
    const theme = useTheme();

    const isLightMode = () => theme.palette.mode === ThemeMode.Light;
    const isDarkMode = () => theme.palette.mode === ThemeMode.Dark;

    return { isLightMode, isDarkMode };
};

export default useThemeMode;

import { useTheme } from "@mui/material";

const useThemeMode = () => {
    const theme = useTheme();

    const isLightMode = () => theme.palette.mode === "light";
    const isDarkMode = () => theme.palette.mode === "dark";

    return { isLightMode, isDarkMode };
};

export default useThemeMode;

import { Container, Paper, Typography } from "@mui/material";
import InfoCard from "../components/InfoCard";
import SettingItem from "../components/SettingItem";
import { selectPreferredTheme, selectSocketStatus, setPreferredTheme, setSocketStatus } from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Settings() {
    const theme = useAppSelector(selectPreferredTheme);
    const socketStatus = useAppSelector(selectSocketStatus);
    const dispatch = useAppDispatch();

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPreferredTheme(event.target.checked ? "dark" : "light"));
    };
    const handleSocketChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSocketStatus(event.target.checked));
    };

    return (
        <Container
            sx={{
                p: 8,
                width: "50%",
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
                <SettingItem checked={theme === "dark"} name="Dark Theme" type="toggle" onChange={handleThemeChange} />
                <SettingItem
                    checked={socketStatus}
                    name="Socket Telemetry"
                    type="toggle"
                    onChange={handleSocketChange}
                />
            </Paper>
        </Container>
    );
}

import { Container } from "@mui/material";
import InfoCard from "../components/InfoCard";
import SettingItem from "../components/SettingItem";
import { selectPreferredTheme, setPreferredTheme } from "../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Settings() {
    const theme = useAppSelector(selectPreferredTheme);
    const dispatch = useAppDispatch();

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPreferredTheme(event.target.checked ? "dark" : "light"));
    };

    return (
        <Container
            sx={{
                p: 8,
                width: "50%",
            }}
        >
            <InfoCard title="Settings">
                <SettingItem checked={theme === "dark"} name="Dark Theme" type="toggle" onChange={handleThemeChange} />
            </InfoCard>
        </Container>
    );
}

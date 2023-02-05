import { Stack, useTheme } from "@mui/material";

const MapData: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%", width: "100%", borderLeft: `1px solid ${theme.palette.divider}`, overflowY: "auto" }}
        >
            [insert data here]
        </Stack>
    );
};

export default MapData;

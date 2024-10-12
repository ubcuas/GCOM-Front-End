import { Typography, Grid, Box } from "@mui/material";
import InfoCardWidget from "../InfoCardWidget";

export default function SpeedSection({ speed, verticalSpeed }: { verticalSpeed: number; speed: number }) {
    return (
        <Box>
            <Typography
                sx={{
                    mb: 1,
                }}
                variant="h5"
            >
                Speed
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                }}
            >
                <InfoCardWidget text="Speed" data={`${speed}m/s`} />
                <InfoCardWidget text="Vertical Speed" data={`${verticalSpeed}m/s`} />
            </Box>
        </Box>
    );
}

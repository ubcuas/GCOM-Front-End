import { Typography, Box } from "@mui/material";
import Widget from "../Widget";

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
                <Widget text="Speed" data={`${speed}m/s`} />
                <Widget text="Vertical Speed" data={`${verticalSpeed}m/s`} />
            </Box>
        </Box>
    );
}

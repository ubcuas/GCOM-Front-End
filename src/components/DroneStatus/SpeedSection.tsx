import { Typography, Grid } from "@mui/material";
import InfoCardWidget from "../InfoCardWidget";

export default function SpeedSection({ speed, verticalSpeed }: { verticalSpeed: number; speed: number }) {
    return (
        <>
            <Typography
                sx={{
                    pb: 2,
                }}
                variant="h5"
            >
                Speed
            </Typography>
            <Grid container spacing={1}>
                <InfoCardWidget gridSpacing={6} text="Speed" data={`${speed}m/s`} />
                <InfoCardWidget gridSpacing={6} text="Vertical Speed" data={`${verticalSpeed}m/s`} />
            </Grid>
        </>
    );
}

import { Typography, Grid } from "@mui/material";
import StatWidget from "../StatWidget";

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
                <StatWidget gridSpacing={6} text="Speed" data={speed} />
                <StatWidget gridSpacing={6} text="Vertical Speed" data={verticalSpeed} />
            </Grid>
        </>
    );
}

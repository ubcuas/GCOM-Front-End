import { Typography, Grid, Box } from "@mui/material";
import StatWidget from "./../StatWidget";

export default function PositionSection({
    latitude,
    longitude,
    altitude,
    heading,
}: {
    latitude: number;
    longitude: number;
    altitude: number;
    heading: number;
}) {
    return (
        <>
            <Typography
                sx={{
                    pb: 2,
                }}
                variant="h5"
            >
                Position
            </Typography>
            <Grid container spacing={1}>
                <StatWidget gridSpacing={6} text="Longitude" data={longitude} />
                <StatWidget gridSpacing={6} text="Latitude" data={latitude} />
                <StatWidget gridSpacing={4} text="Altitude" data={altitude} />
                <StatWidget gridSpacing={8} text="Heading" data={heading} aside={<Compass heading={heading} />} />
            </Grid>
        </>
    );
}

function Compass({ heading }: { heading: number }) {
    return (
        <Box
            sx={{
                flexGrow: 1,
                flexBasis: 0,
            }}
        >
            <svg
                style={{
                    height: "100px",
                }}
                viewBox="0 0 140 140"
                transform={`rotate(${-heading} 0 0)`}
            >
                <polygon points="60,70 70,20 80,70" fill="#2DA0DC" />
                <text x="70" y="15" textAnchor="middle" fill="#2DA0DC">
                    N
                </text>
                <polygon points="60,70 70,120 80,70" fill="white" />
            </svg>
        </Box>
    );
}

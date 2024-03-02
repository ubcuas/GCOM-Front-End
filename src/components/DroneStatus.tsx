import { useAppSelector } from "../store/store";
import { selectAircraftStatus } from "../store/slices/dataSlice";
import InfoCard from "./InfoCard/InfoCard";
import { Box, Grid, ListItem, Typography } from "@mui/material";
import InfoItem from "./InfoCard/InfoItem";

export default function DroneStatus() {
    const droneState = useAppSelector(selectAircraftStatus);

    return (
        <InfoCard title="Drone Status">
            <PositionSection
                latitude={droneState.latitude}
                longitude={droneState.longitude}
                altitude={droneState.altitude}
                heading={droneState.heading}
            />
        </InfoCard>
    );
}

function PositionSection({
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
            <ListItem>
                <Typography variant="h6">Position</Typography>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <InfoItem triplet text="Longitude" data={longitude} />
                    <InfoItem triplet text="Latitude" data={latitude} />
                    <InfoItem triplet text="Altitude" data={altitude} />
                    <InfoItem fullWidth text="Heading" data={heading} aside={<Compass heading={heading} />} />
                </Grid>
            </ListItem>
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
            <svg width="140" height="140" transform={`rotate(${-heading} 0 0)`}>
                <polygon points="60,70 70,20 80,70" fill="#2DA0DC" />
                <text x="70" y="15" textAnchor="middle" fill="#2DA0DC">
                    N
                </text>
                <polygon points="60,70 70,120 80,70" fill="white" />
            </svg>
        </Box>
    );
}

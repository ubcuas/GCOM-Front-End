import { Paper, Typography } from "@mui/material";
import { Waypoint } from "../../types/Waypoint";

interface WaypointItemProps {
    waypoint: Waypoint;
}

export default function WaypointItem({ waypoint }: WaypointItemProps) {
    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">
                {waypoint.name}{" "}
                <Typography
                    component="span"
                    sx={{
                        color: "gray",
                    }}
                >
                    ID#{waypoint.id}
                </Typography>
            </Typography>
            <Typography variant="body1">
                Latitude{" "}
                <Typography
                    component="span"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {waypoint.latitude}
                </Typography>
            </Typography>
            <Typography variant="body1">
                Longitude{" "}
                <Typography
                    component="span"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {waypoint.longitude}
                </Typography>
            </Typography>
            <Typography variant="body1">
                Altitude{" "}
                <Typography
                    component="span"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {waypoint.altitude}
                </Typography>
            </Typography>
            {waypoint.remarks && waypoint.remarks.length > 0 && <Typography>{waypoint.remarks}</Typography>}
        </Paper>
    );
}

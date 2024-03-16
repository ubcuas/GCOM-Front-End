import { Paper, Typography } from "@mui/material";
import { Waypoint } from "../../types/Waypoint";

type WaypointItemProps = {
    waypoint: Waypoint;
};

export default function WaypointItem({ waypoint }: WaypointItemProps) {
    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">
                {waypoint.name}{" "}
                <Typography component="span" color="grey">
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
                    {waypoint.lat}
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
                    {waypoint.long}
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
                    {waypoint.alt}
                </Typography>
            </Typography>
            {waypoint.remarks && waypoint.remarks.length > 0 && (
                <Typography color="grey">{waypoint.remarks}</Typography>
            )}
        </Paper>
    );
}

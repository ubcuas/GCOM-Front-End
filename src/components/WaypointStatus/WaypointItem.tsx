import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { Waypoint } from "../../types/Waypoint";
import DeleteIcon from "@mui/icons-material/Delete";

type WaypointItemProps = {
    waypoint: Waypoint;
    handleDelete: () => void;
};

export default function WaypointItem({ waypoint, handleDelete }: WaypointItemProps) {
    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{waypoint.name}</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography color="grey">ID#{waypoint.id}</Typography>
                    <IconButton color="warning" aria-label="close" size="medium" onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Stack>
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

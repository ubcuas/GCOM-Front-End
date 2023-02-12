import { Stack, Typography, useTheme } from "@mui/material";
import RouteTable from "./mapData/RouteTable";
import WaypointTable from "./mapData/WaypointTable";

const MapData: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="column"
            sx={{ height: "100%", width: "100%", borderLeft: `1px solid ${theme.palette.divider}`, overflowY: "auto" }}
        >
            <Typography variant="h5" margin={theme.spacing(2)}>
                Routes
            </Typography>
            <RouteTable />

            <Typography variant="h5" margin={theme.spacing(2)}>
                Waypoints
            </Typography>
            <WaypointTable />
        </Stack>
    );
};

export default MapData;

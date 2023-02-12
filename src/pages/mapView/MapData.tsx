import { Stack, useTheme } from "@mui/material";
import MapDrawer from "../../components/MapDrawer";
import RouteTable from "./mapData/RouteTable";
import WaypointTable from "./mapData/WaypointTable";

const MapData: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="column"
            sx={{ height: "100%", width: "100%", borderLeft: `1px solid ${theme.palette.divider}`, overflowY: "auto" }}
        >
            <MapDrawer.Header>Routes</MapDrawer.Header>
            <RouteTable />
            <br />
            <MapDrawer.Header>Waypoints</MapDrawer.Header>
            <WaypointTable />
        </Stack>
    );
};

export default MapData;

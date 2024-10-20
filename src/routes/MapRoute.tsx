import { Box } from "@mui/material";
import MapView from "../components/Map/MapView";
import MapMenu from "../components/Map/MapMenu";

export default function MapRoute() {
    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <MapView />
            <MapMenu />
        </Box>
    );
}

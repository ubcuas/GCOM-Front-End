import { Box } from "@mui/material";
import MapData from "./mapView/MapData";
import MapPanel from "./mapView/MapPanel";
import MapSettings from "./mapView/MapSettings";

const MapView: React.FC = () => {
    return (
        <>
            <Box sx={{ height: "90vh", width: "100%", position: "relative", overflow: "hidden" }}>
                <Box sx={{ height: "100%", width: "70%", position: "absolute" }}>
                    <MapPanel />
                </Box>
                <Box sx={{ height: "100%", width: "30%", marginLeft: "70%" }}>
                    <MapData />
                </Box>
                <MapSettings />
            </Box>
        </>
    );
};

export default MapView;

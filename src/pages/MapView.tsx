import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import MapPanel from "./mapView/MapPanel";
import MapSettings from "./mapView/MapSettings";

const MapView: React.FC = () => {
    return (
        <>
            <Box sx={{ height: "90vh", width: "100vw", position: "relative", overflow: "hidden" }}>
                <Box sx={{ height: "100%", width: "100%" }}>
                    <MapPanel />
                </Box>
                <MapSettings />
            </Box>
            <Divider />
        </>
    );
};

export default MapView;

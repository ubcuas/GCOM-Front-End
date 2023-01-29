import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import MapPanel from "./mapView/MapPanel";
import MapSettings from "./mapView/MapSettings";

const MapView: React.FC = () => {
    return (
        <>
            <Box sx={{ height: "80vh", width: "100%", position: "relative" }}>
                <MapSettings />
                <Box sx={{ height: "100%", width: "100%" }}>
                    <MapPanel />
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default MapView;

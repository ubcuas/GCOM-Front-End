import { Box } from "@mui/system";
import "mapbox-gl/dist/mapbox-gl.css";
import MapPanel from "./mapView/MapPanel";

const MapView: React.FC = () => {
    return (
        <Box>
            <MapPanel />
        </Box>
    );
};

export default MapView;

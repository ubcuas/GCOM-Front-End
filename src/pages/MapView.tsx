import { css } from "@emotion/react";
import { Box, Stack } from "@mui/system";
import { motion } from "framer-motion";
import useOpen from "../utils/hooks/useOpen";
import MapPanel from "./mapView/MapPanel";
import MapSettings from "./mapView/MapSettings";

const MapView: React.FC = () => {
    const settings = useOpen();

    return (
        <Stack direction="row" alignItems="stretch" sx={{ height: "80vh" }}>
            <Box
                component={motion.div}
                initial={{ width: "100%" }}
                animate={{ width: settings.isOpen ? "50%" : "100%" }}
                layout
            >
                <MapPanel />
            </Box>
            <Box
                sx={{ overflow: "hidden" }}
                component={motion.div}
                initial={{ width: "0" }}
                animate={{ width: settings.isOpen ? "50%" : "0" }}
                layout
            >
                <MapSettings {...settings} />
            </Box>
        </Stack>
    );
};

export default MapView;

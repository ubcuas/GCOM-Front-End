import { IconButton, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import MapDrawer from "../../../components/MapDrawer";
import PlusIcon from "../../../components/PlusIcon";
import { GEOMET_CAPABILITIES } from "../../../utils/geomet";
import useOpen from "../../../utils/hooks/useOpen";
import GeometLayerToggle from "./geometSettings/GeometLayerToggle";
import SelectedGeometLayerOptions from "./geometSettings/SelectedGeometLayerOptions";

const GeometSettings: React.FC = () => {
    const { isOpen, handleOpen, handleClose } = useOpen();
    const theme = useTheme();

    const { title, desc, layers } = GEOMET_CAPABILITIES;

    return (
        <>
            <Box position="relative">
                <IconButton
                    onClick={handleOpen}
                    sx={{ position: "absolute", top: theme.spacing(0.5), right: theme.spacing(0.5) }}
                >
                    <PlusIcon />
                </IconButton>
                <MapDrawer.Header>Geomet Layers</MapDrawer.Header>
                <SelectedGeometLayerOptions displayOnEmpty={<MapDrawer.Text>No layers selected.</MapDrawer.Text>} />
            </Box>
            <MapDrawer isOpen={isOpen} handleClose={handleClose} width="50vw">
                <MapDrawer.Header variant="h5" sx={{ fontWeight: 500 }}>
                    {title}
                </MapDrawer.Header>
                <MapDrawer.Text>{desc}</MapDrawer.Text>
                <Box>
                    {layers.map((layer) => (
                        <GeometLayerToggle layer={layer} key={layer.title} isMainCategory />
                    ))}
                </Box>
            </MapDrawer>
        </>
    );
};

export default GeometSettings;

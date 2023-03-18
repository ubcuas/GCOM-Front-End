import { IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import MapDrawer from "../../../components/MapDrawer";
import PlusIcon from "../../../icons/PlusIcon";
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
            <Box position="relative" zIndex="999">
                <IconButton
                    onClick={handleOpen}
                    sx={{ position: "absolute", top: theme.spacing(0.5), right: theme.spacing(0.5) }}
                >
                    <PlusIcon />
                </IconButton>

                <MapDrawer.Header>Geomet Layers</MapDrawer.Header>
                <SelectedGeometLayerOptions
                    displayOnEmpty={
                        <Typography
                            variant="overline"
                            sx={{
                                margin: theme.spacing(0, 4),
                                paddingTop: theme.spacing(2),
                                color: theme.palette.text.secondary,
                            }}
                        >
                            No layers selected.
                        </Typography>
                    }
                />
            </Box>

            <MapDrawer isOpen={isOpen} handleClose={handleClose} width="50vw">
                <MapDrawer.Header variant="h5">{title}</MapDrawer.Header>
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

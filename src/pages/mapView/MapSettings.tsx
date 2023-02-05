import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import useOpen from "../../utils/hooks/useOpen";
import MapDrawer from "../../components/MapDrawer";
import GeometSettings from "./mapSettings/GeometSettings";
import { Divider, useTheme } from "@mui/material";
import MapSelections from "./mapSettings/MapSelections";

const MapSettings: React.FC = () => {
    const { isOpen, handleOpen, handleClose } = useOpen();
    const theme = useTheme();

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="large"
                sx={{ position: "absolute", top: theme.spacing(0.5), right: theme.spacing(0.5) }}
            >
                <SettingsIcon fontSize="inherit" />
            </IconButton>
            <MapDrawer isOpen={isOpen} handleClose={handleClose} width="30vw">
                <GeometSettings />
                <Divider />
                <MapDrawer.Header>Map Settings</MapDrawer.Header>
                <MapSelections />
            </MapDrawer>
        </>
    );
};

export default MapSettings;

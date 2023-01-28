import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { Divider, useTheme } from "@mui/material";
import GeometSettings from "./mapSettings/GeometSettings";

type MapSettingsProps = {
    open: () => void;
    close: () => void;
    isOpen: boolean;
};

const MapSettings: React.FC<MapSettingsProps> = ({ open, close, isOpen }) => {
    const theme = useTheme();

    return (
        <>
            <IconButton
                onClick={open}
                size="large"
                sx={{ position: "absolute", right: 0 }}
                component={motion.button}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: isOpen ? 50 : 0, opacity: isOpen ? 0 : 1 }}
            >
                <SettingsIcon fontSize="inherit" />
            </IconButton>
            <Box>
                <Box sx={{ padding: theme.spacing(1) }}>
                    <IconButton onClick={close}>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                <Divider />
                <GeometSettings />
            </Box>
        </>
    );
};

export default MapSettings;

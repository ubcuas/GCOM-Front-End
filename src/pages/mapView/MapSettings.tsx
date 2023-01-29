import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/system";
import { Divider, useTheme } from "@mui/material";
import GeometSettings from "./mapSettings/GeometSettings";
import useOpen from "../../utils/hooks/useOpen";
import { motion } from "framer-motion";

const MapSettings: React.FC = () => {
    const theme = useTheme();
    const { isOpen, open, close } = useOpen();

    return (
        <>
            <IconButton onClick={open} size="large" sx={{ position: "absolute", right: 0, zIndex: 99 }}>
                <SettingsIcon fontSize="inherit" />
            </IconButton>
            <Box
                sx={{
                    position: "absolute",
                    width: "50%",
                    height: "100%",
                    right: 0,
                    zIndex: 999,
                    background: theme.palette.background.paper,
                }}
                component={motion.div}
                initial={{ x: "50vw" }}
                animate={{ x: isOpen ? 0 : "50vw" }}
                transition={{ bounce: 0 }}
            >
                <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}`, height: "100%" }}>
                    <Box sx={{ padding: theme.spacing(1) }}>
                        <IconButton onClick={close}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <GeometSettings />
                </Box>
            </Box>
        </>
    );
};

export default MapSettings;

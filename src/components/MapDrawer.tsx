import { Box, Divider, IconButton, SxProps, Theme, Typography, TypographyVariant, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type MapDrawerProps = {
    isOpen: boolean;
    handleClose: () => void;
    width: string;
};

const MapDrawer: React.FC<PropsWithChildren<MapDrawerProps>> & {
    Header: typeof MapDrawerHeader;
    Text: typeof MapDrawerText;
} = ({ isOpen, handleClose, width, children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "absolute",
                height: "100%",
                width: width,
                right: 0,
                top: 0,
                zIndex: 999,
                background: theme.palette.background.paper,
            }}
            component={motion.div}
            initial={{ x: width }}
            animate={{ x: isOpen ? 0 : width }}
            transition={{ bounce: 0 }}
        >
            <Box
                sx={{ borderLeft: `1px solid ${theme.palette.divider}`, height: "100%", overflowY: "auto" }}
                component={motion.div}
                layoutScroll
            >
                <Box sx={{ padding: theme.spacing(1) }}>
                    <IconButton onClick={handleClose}>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                <Divider />
                {children}
            </Box>
        </Box>
    );
};

type MapDrawerHeaderProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
};

const MapDrawerHeader: React.FC<PropsWithChildren<MapDrawerHeaderProps>> = ({ variant = "h6", sx, children }) => {
    const theme = useTheme();

    return (
        <Typography variant={variant} sx={{ padding: theme.spacing(1, 2), ...sx }}>
            {children}
        </Typography>
    );
};

type MapDrawerTextProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
    noBottomMargin?: boolean;
};

const MapDrawerText: React.FC<PropsWithChildren<MapDrawerTextProps>> = ({
    variant = "body2",
    sx,
    noBottomMargin,
    children,
}) => {
    const theme = useTheme();
    const margin = theme.spacing(0, 2, noBottomMargin ? 0 : 2, 2);

    return (
        <Typography variant={variant} sx={{ margin: margin, ...sx }} component="div">
            {children}
        </Typography>
    );
};

MapDrawer.Header = MapDrawerHeader;
MapDrawer.Text = MapDrawerText;

export default MapDrawer;

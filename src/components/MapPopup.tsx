import { Box, css, IconButton, Typography, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { Popup } from "react-map-gl";
import PlusIcon from "../icons/PlusIcon";

type MapPopupProps = {
    longitude: number;
    latitude: number;
    onClose: () => void;
};

const MapPopup: React.FC<PropsWithChildren<MapPopupProps>> & {
    Header: typeof MapPopupHeader;
} = ({ longitude, latitude, onClose, children }) => {
    const theme = useTheme();

    return (
        <Popup
            longitude={longitude}
            latitude={latitude}
            css={css`
                .mapboxgl-popup-tip {
                    border-bottom-color: ${theme.palette.background.default};
                    border-top-color: ${theme.palette.background.default};
                }
                .mapboxgl-popup-content {
                    background-color: ${theme.palette.background.default};
                    border-radius: ${theme.shape.borderRadius}px;
                    box-shadow: ${theme.shadows[3]};
                }
            `}
            anchor="top"
            onClose={onClose}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton={false}
            closeOnMove
        >
            <IconButton
                size="small"
                onClick={onClose}
                sx={{ position: "absolute", right: theme.spacing(0.5), top: theme.spacing(0.5) }}
            >
                <PlusIcon fontSize="small" remove />
            </IconButton>
            <Box sx={{ typography: theme.typography.body2, padding: theme.spacing(0, 1), lineHeight: 1.5 }}>
                {children}
            </Box>
        </Popup>
    );
};

const MapPopupHeader: React.FC<PropsWithChildren> = ({ children }) => {
    const theme = useTheme();

    return (
        <Typography variant="h6" sx={{ marginRight: theme.spacing(5) }}>
            {children}
        </Typography>
    );
};

MapPopup.Header = MapPopupHeader;

export default MapPopup;

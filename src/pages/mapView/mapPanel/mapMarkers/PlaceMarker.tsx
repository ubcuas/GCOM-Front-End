import { css } from "@emotion/react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import PlusIcon from "../../../../components/PlusIcon";
import { ColorPalette } from "../../../../types/Theming";
import { Waypoint } from "../../../../types/Waypoint";
import PlaceMarkerIcon from "../../../../components/PlaceMarkerIcon";

type PlaceMarkerProps = {
    waypoint: Waypoint;
    isObstacle?: boolean;
    color?: ColorPalette;
    usePopup?: boolean;
};

const PlaceMarker: React.FC<PlaceMarkerProps> = ({ waypoint, isObstacle, color, usePopup }) => {
    const theme = useTheme();
    const [showPopup, setShowPopup] = useState(false);

    const { longitude, latitude, name, id, altitude, remarks } = waypoint;
    const label = name.charAt(0);
    const markerProps = { longitude, latitude };
    const iconProps = { label, isObstacle, color };

    return (
        <>
            <Marker anchor="bottom" offset={[0, 9]} {...markerProps} onClick={() => setShowPopup(true)}>
                <PlaceMarkerIcon {...iconProps} />
            </Marker>
            {usePopup && showPopup && (
                <Popup
                    {...markerProps}
                    css={css`
                        .mapboxgl-popup-tip {
                            border-bottom-color: ${theme.palette.background.default};
                            border-top-color: ${theme.palette.background.default};
                        }
                        .mapboxgl-popup-content {
                            background-color: ${theme.palette.background.default};
                            border-radius: ${theme.shape.borderRadius * 1}px;
                            box-shadow: ${theme.shadows[3]};
                        }
                    `}
                    anchor="top"
                    onClose={() => setShowPopup(false)}
                    closeOnClick={false}
                    focusAfterOpen={false}
                    closeButton={false}
                    closeOnMove
                >
                    <IconButton
                        size="small"
                        onClick={() => setShowPopup(false)}
                        sx={{ position: "absolute", right: theme.spacing(0.5), top: theme.spacing(0.5) }}
                    >
                        <PlusIcon fontSize="small" remove />
                    </IconButton>
                    <Box sx={{ typography: theme.typography.body2, padding: theme.spacing(0, 1), lineHeight: 1.5 }}>
                        <Typography variant="h6" sx={{ marginRight: theme.spacing(5) }}>
                            {name}
                        </Typography>
                        <b>ID:</b> {id}
                        <br />
                        <b>Latitude:</b> {latitude}
                        <br />
                        <b>Longitude:</b> {longitude}
                        <br />
                        <b>Altitude:</b> {altitude}
                        {!!remarks && (
                            <>
                                <br />
                                <b>Remarks:</b> {remarks}
                            </>
                        )}
                    </Box>
                </Popup>
            )}
        </>
    );
};

export default PlaceMarker;

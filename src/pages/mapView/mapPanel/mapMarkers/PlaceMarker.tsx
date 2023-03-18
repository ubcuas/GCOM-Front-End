import { useState } from "react";
import { Marker } from "react-map-gl";
import { ColorPalette } from "../../../../types/Theming";
import { Waypoint } from "../../../../types/Waypoint";
import PlaceMarkerIcon from "../../../../icons/PlaceMarkerIcon";
import MapPopup from "../../../../components/MapPopup";

type PlaceMarkerProps = {
    waypoint: Waypoint;
    isObstacle?: boolean;
    color?: ColorPalette;
    htmlColor?: string;
    isInRoute?: boolean;
    usePopup?: boolean;
};

const PlaceMarker: React.FC<PlaceMarkerProps> = ({
    waypoint,
    isObstacle,
    color,
    htmlColor,
    isInRoute = true,
    usePopup,
}) => {
    const [showPopup, setShowPopup] = useState(false);

    const { longitude, latitude, name, id, altitude } = waypoint;
    const label = name.charAt(0);
    const markerProps = { longitude, latitude };
    const iconProps = { label, isObstacle, color, htmlColor };

    return (
        <>
            <Marker anchor="bottom" offset={[0, 9]} {...markerProps} onClick={() => setShowPopup(true)}>
                <PlaceMarkerIcon {...iconProps} sx={{ opacity: isInRoute ? 1 : 0.2 }} />
            </Marker>
            {usePopup && showPopup && (
                <MapPopup {...markerProps} onClose={() => setShowPopup(false)}>
                    <MapPopup.Header>{name}</MapPopup.Header>
                    <b>ID:</b> {id}
                    <br />
                    <b>Latitude:</b> {latitude}
                    <br />
                    <b>Longitude:</b> {longitude}
                    {!!altitude && (
                        <>
                            <br />
                            <b>Altitude:</b> {altitude}
                        </>
                    )}
                </MapPopup>
            )}
        </>
    );
};

export default PlaceMarker;

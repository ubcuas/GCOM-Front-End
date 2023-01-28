import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { ColorPalette } from "../../../../types/Theming";
import { Waypoint } from "../../../../types/Waypoint";
import PlaceMarkerIcon from "./placeMarker/PlaceMarkerIcon";

type PlaceMarkerProps = {
    waypoint: Waypoint;
    isObstacle?: boolean;
    color?: ColorPalette;
};

const PlaceMarker: React.FC<PlaceMarkerProps> = ({ waypoint, isObstacle, color }) => {
    const [showPopup, setShowPopup] = useState(true);

    const { longitude, latitude, name } = waypoint;
    const label = name.charAt(0);
    const markerProps = { longitude, latitude };
    const iconProps = { label, isObstacle, color };

    return (
        <>
            <Marker anchor="bottom" offset={[0, 10]} {...markerProps} onClick={() => setShowPopup(true)}>
                <PlaceMarkerIcon {...iconProps} />
            </Marker>
            {/* {showPopup && (
                <Popup {...markerProps} anchor="top" onClose={() => setShowPopup(false)} closeButton>
                    You are here
                </Popup>
            )} TODO: fix popup */}
        </>
    );
};

export default PlaceMarker;

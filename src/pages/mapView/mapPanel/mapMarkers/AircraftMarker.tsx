import { Marker } from "react-map-gl";
import FlightIcon from "@mui/icons-material/Flight";
import useThemeMode from "../../../../utils/hooks/useThemeMode";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../../../../store";
import { selectAircraftStatus } from "../../../../store/slices/dataSlice";
import { useState } from "react";
import MapPopup from "../../../../components/MapPopup";

const AircraftMarker: React.FC = () => {
    const theme = useTheme();
    const { isDarkMode } = useThemeMode();
    const { velocity, longitude, latitude, altitude, heading, voltage } = useAppSelector(selectAircraftStatus);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <Marker
                longitude={longitude}
                latitude={latitude}
                rotation={heading}
                anchor="center"
                rotationAlignment="map"
                onClick={() => setShowPopup(true)}
            >
                <FlightIcon
                    fontSize="large"
                    htmlColor={isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark}
                />
            </Marker>
            {showPopup && (
                <MapPopup longitude={longitude} latitude={latitude} onClose={() => setShowPopup(false)}>
                    <MapPopup.Header>Aircraft</MapPopup.Header>
                    <b>Velocity:</b> {velocity}
                    <br />
                    <b>Longitude:</b> {longitude}
                    <br />
                    <b>Latitude:</b> {latitude}
                    <br />
                    <b>Altitude:</b> {altitude}
                    <br />
                    <b>Heading:</b> {heading}
                    <br />
                    <b>Voltage:</b> {voltage}
                </MapPopup>
            )}
        </>
    );
};

export default AircraftMarker;

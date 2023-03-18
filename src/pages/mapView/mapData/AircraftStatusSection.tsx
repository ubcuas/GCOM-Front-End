import { Box } from "@mui/material";
import { useAppSelector } from "../../../store";
import { selectAircraftStatus } from "../../../store/slices/dataSlice";

const AircraftStatusSection: React.FC = () => {
    const { velocity, longitude, latitude, altitude, heading, voltage } = useAppSelector(selectAircraftStatus);

    return (
        <Box>
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
        </Box>
    );
};

export default AircraftStatusSection;

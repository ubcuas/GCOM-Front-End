import { useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import bearing from "@turf/bearing";
import { Marker } from "react-map-gl";
import { AEACRoute } from "../../../../types/AEAC";
import { Waypoint } from "../../../../types/Waypoint";
import WaypointUtility from "../../../../utils/WaypointUtility";
import { MapStyles } from "../../../../utils/constants/enums/map";
import { useAppSelector } from "../../../../store";
import { selectMapStyle } from "../../../../store/slices/mapSlice";

type RouteDirectionMarkerProps = {
    route: AEACRoute;
    waypoints: Waypoint[];
};

const RouteDirectionMarker: React.FC<RouteDirectionMarkerProps> = ({ route, waypoints }) => {
    const theme = useTheme();
    const isSatelliteStyle = useAppSelector(selectMapStyle) === MapStyles.Satellite;
    const [start, end] = WaypointUtility.getRouteCoordinates(route, waypoints);
    const angle = bearing(start, end) - 90;

    const [lon, lat] = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

    return (
        <>
            <Marker
                longitude={lon}
                latitude={lat}
                anchor="center"
                rotation={angle}
                rotationAlignment="map"
                style={{
                    height: "35.5px", // deal with this and viewBox because size increase
                    color: isSatelliteStyle ? theme.palette.common.white : theme.palette.text.primary,
                }}
            >
                <ChevronRightIcon viewBox="0 0 32 24" fontSize="large" />
            </Marker>
        </>
    );
};

export default RouteDirectionMarker;

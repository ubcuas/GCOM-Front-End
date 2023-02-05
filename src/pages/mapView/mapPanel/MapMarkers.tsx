import { Marker } from "react-map-gl";
import FlightIcon from "@mui/icons-material/Flight";
import PlaceMarker from "./mapMarkers/PlaceMarker";
import { useAppSelector } from "../../../store";
import { selectRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import RouteDirectionMarker from "./mapMarkers/RouteDirectionMarker";
import { useMemo } from "react";

const MapMarkers: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);

    const routeDirectionMarkers = useMemo(
        () => routes.map((route) => <RouteDirectionMarker key={route.id} route={route} waypoints={waypoints} />),
        [routes, waypoints]
    );
    const waypointMarkers = useMemo(
        () =>
            waypoints.map((waypoint) => {
                return <PlaceMarker key={waypoint.id} waypoint={waypoint} usePopup />;
            }),
        [waypoints]
    );

    return (
        <>
            <Marker longitude={-123.25} latitude={49.262} anchor="center" rotationAlignment="map">
                <FlightIcon fontSize="large" />
            </Marker>
            {routeDirectionMarkers}
            {waypointMarkers}
        </>
    );
};

export default MapMarkers;

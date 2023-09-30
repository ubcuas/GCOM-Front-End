import PlaceMarker from "./mapMarkers/PlaceMarker";
import { useAppSelector } from "../../../store";
import { selectCurrentTaskRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import RouteDirectionMarker from "./mapMarkers/RouteDirectionMarker";
import { useMemo } from "react";
import ColorUtility from "../../../utils/ColorUtility";
import useThemeMode from "../../../utils/hooks/useThemeMode";
import WaypointUtility from "../../../utils/WaypointUtility";
import AircraftMarker from "./mapMarkers/AircraftMarker";

const MapMarkers: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectCurrentTaskRoutes);
    const { themeMode } = useThemeMode();

    const routeDirectionMarkers = useMemo(
        () => routes.map((route) => <RouteDirectionMarker key={route.id} route={route} waypoints={waypoints} />),
        [routes, waypoints]
    );
    const waypointMarkers = useMemo(
        () =>
            waypoints.map((waypoint) => {
                return (
                    <PlaceMarker
                        key={waypoint.id}
                        waypoint={waypoint}
                        htmlColor={ColorUtility.getColorFamilyFromIndex(waypoint.id)[themeMode].main}
                        isInRoute={WaypointUtility.isInRoute(waypoint, routes)}
                        usePopup
                    />
                );
            }),
        [waypoints, routes]
    );

    return (
        <>
            {routeDirectionMarkers}
            <AircraftMarker />
            {waypointMarkers}
        </>
    );
};

export default MapMarkers;

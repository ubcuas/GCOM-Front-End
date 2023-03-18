import { Marker } from "react-map-gl";
import FlightIcon from "@mui/icons-material/Flight";
import PlaceMarker from "./mapMarkers/PlaceMarker";
import { useAppSelector } from "../../../store";
import { selectRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import RouteDirectionMarker from "./mapMarkers/RouteDirectionMarker";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import { ThemeMode } from "../../../utils/constants/enums/theme";
import ColorUtility from "../../../utils/ColorUtility";
import useThemeMode from "../../../utils/hooks/useThemeMode";
import WaypointUtility from "../../../utils/WaypointUtility";

const MapMarkers: React.FC = () => {
    const theme = useTheme();
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);
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
        [waypoints]
    );

    return (
        <>
            {routeDirectionMarkers}
            <Marker longitude={-123.25} latitude={49.262} anchor="center" rotationAlignment="map">
                <FlightIcon
                    fontSize="large"
                    htmlColor={
                        theme.palette.mode === ThemeMode.Dark ? theme.palette.primary.light : theme.palette.primary.dark
                    }
                />
            </Marker>
            {waypointMarkers}
        </>
    );
};

export default MapMarkers;

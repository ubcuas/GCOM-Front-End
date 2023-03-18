import { AEACRoute } from "../types/AEAC";
import { Waypoint } from "../types/Waypoint";

export default class WaypointUtility {
    private static waypointMatcher = (name: string) => {
        return (wp: Waypoint) => wp.name === name;
    };

    public static getId = (name: string, waypoints: Waypoint[]) => {
        return waypoints.find(WaypointUtility.waypointMatcher(name))?.id ?? -1;
    };

    public static getByName = (name: string, waypoints: Waypoint[]) => {
        return waypoints.find(WaypointUtility.waypointMatcher(name));
    };

    public static getCoordinates = (wp?: Waypoint) => {
        return wp ? [wp.longitude, wp.latitude] : [];
    };

    public static getRouteCoordinates = (route: AEACRoute, waypoints: Waypoint[]) => {
        const startWaypoint = WaypointUtility.getByName(route.start_waypoint, waypoints);

        const endWaypoint = WaypointUtility.getByName(route.end_waypoint, waypoints);

        return [WaypointUtility.getCoordinates(startWaypoint), WaypointUtility.getCoordinates(endWaypoint)];
    };

    public static isInRoute = (waypoint: Waypoint, routes: AEACRoute[]) => {
        const { name } = waypoint;
        return !!routes.find(({ start_waypoint, end_waypoint }) => name === start_waypoint || name === end_waypoint);
    };
}

import { Route } from "../types/Route";
import { Waypoint } from "../types/Waypoint";

export default class WaypointUtility {
    public static getById = (id: number, waypoints: Waypoint[]) => {
        return waypoints.find((wp) => wp.id === id);
    };

    public static getNameById = (id: number, waypoints: Waypoint[]) => {
        return WaypointUtility.getById(id, waypoints)?.name;
    };

    public static getLetterById = (id: number, waypoints: Waypoint[]) => {
        return WaypointUtility.getNameById(id, waypoints)?.charAt(0);
    };

    public static getCoordinates = (wp?: Waypoint) => {
        return wp ? [wp.longitude, wp.latitude] : [];
    };

    public static getRouteCoordinates = (route: Route, waypoints: Waypoint[]) => {
        const startWaypoint = WaypointUtility.getById(route.start_waypoint, waypoints);

        const endWaypoint = WaypointUtility.getById(route.end_waypoint, waypoints);

        return [WaypointUtility.getCoordinates(startWaypoint), WaypointUtility.getCoordinates(endWaypoint)];
    };

    public static isInRoute = (waypoint: Waypoint, routes: Route[]) => {
        const { id } = waypoint;
        return !!routes.find(({ start_waypoint, end_waypoint }) => id === start_waypoint || id === end_waypoint);
    };
}

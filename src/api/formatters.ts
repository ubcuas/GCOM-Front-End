import { Waypoint } from "../types/Waypoint";

export const serializeWaypointForGCOM = (waypoint: Waypoint, order: number) => {
    return {
        name: waypoint.name,
        latitude: waypoint.lat,
        longitude: waypoint.long,
        altitude: waypoint.alt,
        radius: waypoint.radius,
        order: order,
        route: 1,
    };
};

export const deserializeWaypoints = (
    waypoints: Array<{
        id: string;
        name: string;
        latitude: number;
        longitude: number;
        altitude: number;
        radius: number;
        pass_radius: number;
        pass_option: number;
        order: number;
        route: number;
    }>,
): Waypoint[] => {
    return waypoints
        .sort((a, b) => a.order - b.order)
        .map((wp) => ({
            id: wp.id,
            name: wp.name,
            lat: wp.latitude,
            long: wp.longitude,
            alt: wp.altitude,
            radius: wp.radius,
        }));
};

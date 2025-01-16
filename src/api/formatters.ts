import { Waypoint } from "../types/Waypoint";

export const formatWaypointForGCOM = (waypoint: Waypoint) => {
    return {
        name: waypoint.name,
        latitude: waypoint.lat,
        longitude: waypoint.long,
        altitude: waypoint.alt,
        radius: waypoint.radius,
        order: 0,
        route: 1,
    };
};

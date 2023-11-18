/**
 * Based on the Drone struct in GCOM-2023.
 *
 * Is altitude here relative?
 */

enum Designation {
    Launch,
    Land,
    Obstacle,
    Payload,
}

export type Waypoint = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    altitude: number;
    radius?: number;
    designation?: Designation;
    remarks?: string;
};

/**
 * Based on the Drone struct in GCOM-2023.
 */

// maybe not needed idk
export enum Designation {
    Launch = "launch",
    Land = "land",
    Obstacle = "obstacle",
    Payload = "payload",
}

export type Waypoint = {
    id: string;
    name?: string;
    lat: number;
    long: number;
    alt?: number;
    radius?: number;
    remarks?: string;
    command?: string;
    param1?: number;
    param2?: number;
    param3?: number;
    param4?: number;
};

export type WaypointEditState = {
    index: number;
    waypoint?: Waypoint;
};

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
    designation?: Designation;
    remarks?: string;
};

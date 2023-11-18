/**
 * Based on the Drone struct in GCOM-2023.
 */

// maybe not needed idk
export enum Designation {
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

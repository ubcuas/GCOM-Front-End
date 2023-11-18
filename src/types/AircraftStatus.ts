/**
 * Based on the Drone struct in GCOM-2023.
 */

export type AircraftStatus = {
    timestamp: number;
    latitude: number;
    longitude: number;
    altitude: number;
    verticalSpeed: number;
    speed: number;
    heading: number;
    // payload is currently TBD on backend
    voltage: number;
};

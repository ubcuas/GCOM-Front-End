/**
 * Type defs for ground and air objects (other drones)
 */

export enum GroundObjectType {
    Standard,
    Emergent,
}

enum Shape {}
// TBD

enum Color {}
// TBD

export type GroundObject = {
    id: number;
    type: GroundObjectType;
    shape: Shape;
    color: Color;
    text: string;
    textcolor: string;
    xoffset: number;
    yoffset: number;
};

export type AirObject = {
    id: string;
    longitude: number;
    latitude: number;
    altitude: number;
    verticalSpeed: number;
    speed: number;
    heading: number;
    lastUpdated: number;
};

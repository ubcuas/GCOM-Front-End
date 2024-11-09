import { Coords } from "../types/Coords";

export const defaultCoords: Coords = {
    // UBC
    long: -123.246,
    lat: 49.2606,
};

export function validCoords(coords: Coords) {
    return coords.lat !== null && coords.long !== null && checkLat(coords.lat) && checkLong(coords.long);
}

export function checkLat(lat: number) {
    return lat <= 90 && lat >= -90;
}

export function checkLong(long: number) {
    return long <= 180 && long >= -180;
}

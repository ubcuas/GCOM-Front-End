import { Coords } from "../types/Coords";
import { getStorageValue, setStorageValue } from "./useLocalStorage";

export const defaultCoords: Coords = {
    // ALMA AIRPORT, QC
    long: -71.6505103,
    lat: 48.5086187,
};

function validCoords(coords: Coords) {
    return (
        coords.lat !== null &&
        coords.long !== null &&
        coords.lat <= 90 &&
        coords.lat >= -90 &&
        coords.long <= 180 &&
        coords.long >= -180
    );
}

export function getDefaultCoords() {
    // let coords = getStorageValue<Coords>("coords", { long: -9999, lat: -9999 });
    // if (!validCoords(coords)) {
    //     setStorageValue("coords", defaultCoords);
    //     coords = defaultCoords;
    // }
    return defaultCoords;
}

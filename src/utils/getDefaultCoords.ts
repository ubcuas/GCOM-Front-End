export function getDefaultCoordinates(): { long: number; lat: number } {
    const almaDefault = { long: -71.6505103, lat: 48.5086187 }; // ALMA AIRPORT, QC
    localStorage.setItem("latitude", almaDefault.lat.toString());
    localStorage.setItem("longitude", almaDefault.long.toString());
    return almaDefault;
}

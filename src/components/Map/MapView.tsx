import { Box } from "@mui/material";
import Map, { Layer, LayerProps, Marker, Source } from "react-map-gl/maplibre";
import { useAppSelector } from "../../store/store";
import { selectWaypoints } from "../../store/slices/dataSlice";
import { getStorageValue, setStorageValue } from "../../utils/useLocalStorage";
import { Coords } from "../../types/Coords";
import { defaultCoords } from "../../utils/defaultCoords";

function validCoords(coords: Coords) {
    return (
        coords.lat <= 90 &&
        coords.lat >= -90 &&
        coords.long <= 180 &&
        coords.long >= -180 &&
        coords.lat !== null &&
        coords.long !== null
    );
}

function getDefaultCoords() {
    let coords = getStorageValue<Coords>("coords", { long: -9999, lat: -9999 });
    if (!validCoords(coords)) {
        setStorageValue("coords", defaultCoords);
        coords = defaultCoords;
    }
    return coords;
}

export default function MapView() {
    const mpsWaypoints = useAppSelector(selectWaypoints);
    const coords = getDefaultCoords();

    const routeData: GeoJSON.GeoJSON = {
        type: "LineString",
        coordinates: mpsWaypoints.map((waypoint) => [waypoint.long, waypoint.lat]),
    };
    const routeStyle: LayerProps = {
        id: "mps-route",
        type: "line",
        paint: {
            "line-color": "#ff0000",
            "line-width": 3,
        },
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "calc(100vw - 56px)", // 56px is the width of the vertical tabs
            }}
        >
            <Map
                initialViewState={{
                    longitude: coords.long,
                    latitude: coords.lat,
                    zoom: 14,
                }}
                mapStyle={
                    window.navigator.onLine
                        ? "https://api.maptiler.com/maps/basic-v2/style.json?key=ioE7W2lCif3DO9oj1YJh"
                        : "./src/mapStyles/osmbright.json"
                }
            >
                {mpsWaypoints.map((waypoint) => (
                    <Marker latitude={waypoint.lat} longitude={waypoint.long} />
                ))}
                <Source type="geojson" data={routeData}>
                    <Layer {...routeStyle} />
                </Source>
            </Map>
        </Box>
    );
}

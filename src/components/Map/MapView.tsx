import { Box } from "@mui/material";
import Map, { Layer, LayerProps, Marker, Source } from "react-map-gl/maplibre";
import { useAppSelector } from "../../store/store";
import { selectWaypoints } from "../../store/slices/dataSlice";
import { getDefaultCoordinates } from "../../utils/getDefaultCoords";

function validCoords(coords: { lat: number; long: number }) {
    return coords.lat <= 90 && coords.lat >= -90 && coords.long <= 180 && coords.long >= -180;
}

export default function MapView() {
    const mpsWaypoints = useAppSelector(selectWaypoints);
    const { lat, long } = {
        lat: localStorage.getItem("latitude"),
        long: localStorage.getItem("longitude"),
    };
    let actualCords;
    if (lat !== null && long !== null && validCoords({ lat: parseFloat(lat), long: parseFloat(long) })) {
        actualCords = { lat: parseFloat(lat), long: parseFloat(long) };
    } else {
        actualCords = getDefaultCoordinates();
    }
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
                    longitude: actualCords.long,
                    latitude: actualCords.lat,
                    zoom: 14,
                }}
                mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=ioE7W2lCif3DO9oj1YJh"
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

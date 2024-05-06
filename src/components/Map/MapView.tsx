import { Box } from "@mui/material";
import Map, { Layer, LayerProps, LineLayer, Marker, Source } from "react-map-gl/maplibre";
import { useAppSelector } from "../../store/store";
import { selectWaypoints } from "../../store/slices/dataSlice";

export default function MapView() {
    const mpsWaypoints = useAppSelector(selectWaypoints);
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
                width: "calc(100vw - 56px)",
            }}
        >
            <Map
                initialViewState={{
                    longitude: -71.6505103,
                    latitude: 48.5086187,
                    zoom: 13,
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

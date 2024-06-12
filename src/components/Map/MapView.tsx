import { Flight, Place } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Fragment, useEffect } from "react";
import Map, { Layer, LayerProps, Marker, Source } from "react-map-gl/maplibre";
import {
    initializeMpsWaypointMapState,
    selectMpsWaypointMapState,
    toggleMpsWaypointMapState,
} from "../../store/slices/appSlice";
import { selectAircraftStatus, selectMPSWaypoints } from "../../store/slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getDefaultCoords } from "../../utils/coords";
import WaypointItem from "../WaypointItem";

export default function MapView() {
    const mpsWaypoints = useAppSelector(selectMPSWaypoints);
    const mpsWaypointMapState = useAppSelector(selectMpsWaypointMapState);
    const aircraftStatus = useAppSelector(selectAircraftStatus);
    const coords = getDefaultCoords();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeMpsWaypointMapState(mpsWaypoints.length));
    }, []);

    const routeData: GeoJSON.GeoJSON = {
        type: "LineString",
        coordinates: mpsWaypoints.map((waypoint) => [waypoint.long, waypoint.lat]),
    };
    const routeStyle: LayerProps = {
        id: "mps-route",
        type: "line",
        paint: {
            "line-color": "#ee4455",
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
                doubleClickZoom={false}
            >
                {mpsWaypoints.map((waypoint, i) => (
                    <Fragment key={i}>
                        <Marker
                            latitude={waypoint.lat}
                            longitude={waypoint.long}
                            onClick={() => dispatch(toggleMpsWaypointMapState(i))}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <Place
                                sx={{
                                    color: "#ee4455",
                                    fontSize: "48px",
                                    position: "absolute",
                                    top: "-46px",
                                    left: "-24px",
                                }}
                            />
                            <Box
                                sx={{
                                    background: "#ee4455",
                                    height: "18px",
                                    width: "12px",
                                    position: "absolute",
                                    left: "-6px",
                                    top: "-36px",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                }}
                            >
                                {i + 1}
                            </Box>
                        </Marker>
                        {mpsWaypointMapState[i] && (
                            <Marker latitude={waypoint.lat} longitude={waypoint.long}>
                                <WaypointItem
                                    sx={{
                                        position: "absolute",
                                        width: "180px",
                                        top: "10px",
                                    }}
                                    waypoint={waypoint}
                                />
                            </Marker>
                        )}
                    </Fragment>
                ))}
                <Marker latitude={aircraftStatus.latitude} longitude={aircraftStatus.longitude}>
                    <Flight
                        sx={{
                            color: "primary.main",
                            rotate: `${aircraftStatus.heading}deg`,
                            fontSize: "48px",
                        }}
                    />
                </Marker>
                <Source type="geojson" data={routeData}>
                    <Layer {...routeStyle} />
                </Source>
            </Map>
        </Box>
    );
}

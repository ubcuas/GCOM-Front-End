// Honestly its just easier to have this in a separate file rather than having it be in with MapView.tsx

import { Place } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { Layer, LayerProps, Map, MapLayerMouseEvent, Marker, Source } from "react-map-gl/maplibre";
import { addToQueuedWaypoints, editWaypointAtIndex, selectQueuedWaypoints } from "../../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getDefaultCoords } from "../../utils/coords";
import WaypointItem from "../WaypointItem";
import { roundTo } from "../../utils/routeTo";
import { Box } from "@mui/material";
import { WaypointEditState } from "../../types/Waypoint";

type DraggedMarker = {
    long: number;
    lat: number;
    index: number;
};

type CreationMapProps = {
    handleDelete: (index: number) => void;
    handleEdit: (index: number) => void;
    editState: WaypointEditState;
};

export default function WaypointCreationMap({ handleDelete, handleEdit, editState }: CreationMapProps) {
    const coords = getDefaultCoords();
    const clientWPQueue = useAppSelector(selectQueuedWaypoints);
    const dispatch = useAppDispatch();
    const [selectedWaypoints, setSelectedWaypoints] = useState<boolean[]>(clientWPQueue.map(() => false));
    const [draggedMarkerData, setDraggedMarkerData] = useState<DraggedMarker | null>(null);

    const routeData: GeoJSON.GeoJSON = {
        type: "LineString",
        coordinates: clientWPQueue.map((waypoint) => [waypoint.long, waypoint.lat]),
    };
    const routeStyle: LayerProps = {
        id: "mps-route",
        type: "line",
        paint: {
            "line-color": "#ee4455",
            "line-width": 3,
        },
    };

    const createNewWaypoint = (event: MapLayerMouseEvent) => {
        if (event.originalEvent.detail !== 2) return;
        dispatch(
            addToQueuedWaypoints({
                id: "-1",
                lat: roundTo(event.lngLat.lat, 7),
                long: roundTo(event.lngLat.lng, 7),
            }),
        );
        setSelectedWaypoints((prev) => [...prev, false]);
    };

    const handleSelectWaypoint = (index: number) => {
        setSelectedWaypoints((prev) => {
            const newSelected = [...prev];
            newSelected[index] = !newSelected[index];
            return newSelected;
        });
    };

    return (
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
            onClick={createNewWaypoint}
            doubleClickZoom={false}
            style={{
                minHeight: "500px",
            }}
        >
            {clientWPQueue.map((waypoint, i) => {
                return (
                    <Fragment key={i}>
                        <Marker
                            draggable
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                handleSelectWaypoint(i);
                            }}
                            onDrag={(e) => {
                                setDraggedMarkerData({
                                    long: e.lngLat.lng,
                                    lat: e.lngLat.lat,
                                    index: i,
                                });
                            }}
                            onDragEnd={() => {
                                dispatch(
                                    editWaypointAtIndex({
                                        index: i,
                                        waypoint: {
                                            ...waypoint,
                                            lat: roundTo(draggedMarkerData!.lat, 7),
                                            long: roundTo(draggedMarkerData!.long, 7),
                                        },
                                    }),
                                );
                                setDraggedMarkerData(null);
                            }}
                            latitude={
                                draggedMarkerData && draggedMarkerData.index === i
                                    ? draggedMarkerData.lat
                                    : waypoint.lat
                            }
                            longitude={
                                draggedMarkerData && draggedMarkerData.index === i
                                    ? draggedMarkerData.long
                                    : waypoint.long
                            }
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
                        {selectedWaypoints[i] && (
                            <Marker
                                latitude={
                                    draggedMarkerData && draggedMarkerData.index === i
                                        ? draggedMarkerData.lat
                                        : waypoint.lat
                                }
                                longitude={
                                    draggedMarkerData && draggedMarkerData.index === i
                                        ? draggedMarkerData.long
                                        : waypoint.long
                                }
                            >
                                <WaypointItem
                                    sx={{
                                        position: "absolute",
                                        width: "220px",
                                        top: "10px",
                                        border: "4px solid",
                                        borderColor: i === editState.index ? "primary.main" : "transparent",
                                    }}
                                    waypoint={waypoint}
                                    handleDelete={() => {
                                        handleDelete(i);
                                        setSelectedWaypoints((prev) => {
                                            prev.splice(i, 1);
                                            return prev;
                                        });
                                    }}
                                    handleEdit={() => handleEdit(i)}
                                />
                            </Marker>
                        )}
                    </Fragment>
                );
            })}
            <Source type="geojson" data={routeData}>
                <Layer {...routeStyle} />
            </Source>
        </Map>
    );
}

// Honestly its just easier to have this in a separate file rather than having it be in with MapView.tsx

import { AddHomeWork, Place } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { Layer, LayerProps, Map, MapLayerMouseEvent, Marker, Source } from "react-map-gl/maplibre";
import { selectMapCenterCoords, selectWaypoints } from "../../store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import WaypointItem from "../WaypointItem";
import { roundTo } from "../../utils/routeTo";
import { Box } from "@mui/material";
import { Waypoint, WaypointEditState } from "../../types/Waypoint";
import { useWaypoints } from "../../utils/useWaypoints";

type DraggedMarker = {
    long: number;
    lat: number;
    index: number;
};

type CreationMapProps = {
    handleDelete: (index: number) => void;
    startEditing: (index: number) => void;
    submitWaypoint: (wp: Waypoint) => void;
    setEditingCoords: (coords: { lat: number; long: number }) => void;
    editingIndex: number;
};

export default function WaypointCreationMap({
    handleDelete,
    startEditing,
    editingIndex,
    setEditingCoords,
    submitWaypoint,
}: CreationMapProps) {
    const coords = useAppSelector(selectMapCenterCoords);
    const { waypoints } = useWaypoints();
    const [selectedWaypoints, setSelectedWaypoints] = useState<boolean[]>(waypoints?.map(() => false) || []);
    const [draggedMarkerData, setDraggedMarkerData] = useState<DraggedMarker | null>(null);

    const routeData: GeoJSON.GeoJSON = {
        type: "LineString",
        coordinates: waypoints?.map((waypoint) => [waypoint.long, waypoint.lat]) || [],
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
        const wp = {
            lat: roundTo(event.lngLat.lat, 7),
            long: roundTo(event.lngLat.lng, 7),
            alt: 0,
            radius: 123123,
            name: "New Waypoint",
            id: "-1",
        };
        submitWaypoint(wp);
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
                    : "http://localhost:8000/api/map-tiles/osmbright"
            }
            onClick={createNewWaypoint}
            doubleClickZoom={false}
            style={{
                minHeight: "500px",
            }}
        >
            {waypoints?.map((waypoint, i) => {
                return (
                    <Fragment key={i}>
                        <Marker
                            draggable
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                handleSelectWaypoint(i);
                            }}
                            onDragStart={(e) => {
                                startEditing(i);
                            }}
                            onDrag={(e) => {
                                setEditingCoords({
                                    lat: e.lngLat.lat,
                                    long: e.lngLat.lng,
                                });
                                setDraggedMarkerData({
                                    long: e.lngLat.lng,
                                    lat: e.lngLat.lat,
                                    index: i,
                                });
                            }}
                            onDragEnd={() => {
                                const wp = {
                                    ...waypoint,
                                    lat: roundTo(draggedMarkerData!.lat, 7),
                                    long: roundTo(draggedMarkerData!.long, 7),
                                };
                                submitWaypoint(wp);
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
                                        borderColor: i === editingIndex ? "primary.main" : "transparent",
                                    }}
                                    waypoint={waypoint}
                                    handleDelete={() => {
                                        handleDelete(i);
                                        setSelectedWaypoints((prev) => {
                                            prev.splice(i, 1);
                                            return prev;
                                        });
                                    }}
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

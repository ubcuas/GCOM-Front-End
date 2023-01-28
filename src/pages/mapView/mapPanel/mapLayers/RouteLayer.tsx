import { useTheme } from "@mui/material";
import { Position } from "geojson";
import { Layer, LayerProps, Source, SourceProps } from "react-map-gl";
import { useAppSelector } from "../../../../store";
import { selectRoutes, selectWaypoints } from "../../../../store/slices/dataSlice";
import { selectMapStyle } from "../../../../store/slices/mapSlice";
import { MapStyles } from "../../../../utils/constants/enums/map";
import TileUtility from "../../../../utils/TileUtility";
import WaypointUtility from "../../../../utils/WaypointUtility";

type RouteLayerProps = {
    dividerId: string;
};

const RouteLayer: React.FC<RouteLayerProps> = ({ dividerId }) => {
    const theme = useTheme();
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);
    const isSatelliteStyle = useAppSelector(selectMapStyle) === MapStyles.Satellite;
    const tileId = "route";
    const strokeWidth = 1;
    const routeWidth = 1;

    const coordinates: Position[][] = routes.map((route) => WaypointUtility.getRouteCoordinates(route, waypoints));

    const sourceProps: SourceProps = {
        id: TileUtility.getSourceIdFromTileId(tileId),
        type: "geojson",
        data: {
            type: "MultiLineString",
            coordinates: coordinates,
        },
    };

    const getStrokeLayers = (num: number) => {
        return Array.from({ length: num }, (_, i) => <Layer key={i} {...getStrokeLayerProps(i)} />);
    };

    const getStrokeLayerProps = (i: number): LayerProps => {
        return {
            id: `${tileId}-stroke-${i}`,
            type: "line",
            paint: {
                "line-color": theme.palette.common.black,
                "line-gap-width": routeWidth + i,
            },
            layout: { "line-cap": "round" },
            beforeId: dividerId,
        };
    };

    const lineLayerProps: LayerProps = {
        id: tileId,
        type: "line",
        paint: {
            "line-color": isSatelliteStyle ? theme.palette.common.white : theme.palette.text.primary,
            "line-width": routeWidth,
        },
        layout: { "line-cap": "round" },
        beforeId: dividerId,
    };

    return (
        <Source {...sourceProps}>
            {isSatelliteStyle && getStrokeLayers(strokeWidth)}
            <Layer {...lineLayerProps} />
        </Source>
    );
};

export default RouteLayer;

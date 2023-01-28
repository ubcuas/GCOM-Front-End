import { useTheme } from "@mui/material";
import { Position } from "geojson";
import { Layer, LayerProps, Source, SourceProps } from "react-map-gl";
import TileUtility from "../../../../utils/TileUtility";

type ObstacleLayerProps = {
    dividerId: string;
};

const ObstacleLayer: React.FC<ObstacleLayerProps> = ({ dividerId }) => {
    const theme = useTheme();
    const tileId = "obstacle";

    const coordinates: Position[][] = [
        [
            [-123.26, 49.25],
            [-123.25, 49.23],
            [-123.247, 49.28],
        ],
    ];

    const preparedCoordinates = coordinates.map((arr) => [...arr, arr[0]]);

    const sourceProps: SourceProps = {
        id: TileUtility.getSourceIdFromTileId(tileId),
        type: "geojson",
        data: {
            type: "MultiLineString",
            coordinates: preparedCoordinates,
        },
    };

    const lineLayerProps: LayerProps = {
        id: tileId,
        type: "line",
        paint: {
            "line-color": theme.palette.error.main,
            "line-width": 1,
        },
        layout: { "line-cap": "round" },
        beforeId: dividerId,
    };

    return (
        <Source {...sourceProps}>
            <Layer {...lineLayerProps} />
        </Source>
    );
};

export default ObstacleLayer;

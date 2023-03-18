import { useTheme } from "@mui/material";
import { Layer, LayerProps, Source, SourceProps } from "react-map-gl";
import { useAppSelector } from "../../../../store";
import { selectObstacles } from "../../../../store/slices/dataSlice";
import TileUtility from "../../../../utils/TileUtility";

type RestrictedAreaLayerProps = {
    dividerId: string;
};

const RestrictedAreaLayer: React.FC<RestrictedAreaLayerProps> = ({ dividerId }) => {
    const obstacles = useAppSelector(selectObstacles);
    const theme = useTheme();
    const tileId = "restricted-area";

    const preparedCoordinates = obstacles.map((obstacleArray) => [...obstacleArray, obstacleArray[0]]);

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
            "line-width": 2,
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

export default RestrictedAreaLayer;

import { Layer, LayerProps, Source, SourceProps } from "react-map-gl";
import TileUtility from "../utils/TileUtility";

type WmsTileProps = {
    id: string;
    url: string;
    layer: string;
    size?: number;
    opaque?: boolean;
    layerOpacity?: number;
    layerStyle?: string;
    beforeId?: string;
    isVisible?: boolean;
};

const WmsTile: React.FC<WmsTileProps> = ({
    id,
    url,
    layer,
    size = 256,
    opaque = false,
    layerOpacity = 1.0,
    layerStyle = "",
    beforeId,
    isVisible = true,
}) => {
    const defaultParams = "?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&BBOX={bbox-epsg-3857}&SRS=EPSG:3857";
    const formatParams = `&FORMAT=image/${opaque ? "jpeg" : "png&TRANSPARENCY=true"}`;
    const sizeParams = `&WIDTH=${size}&HEIGHT=${size}`;
    const styleParams = layerStyle ? `&STYLE=${layerStyle}` : undefined;
    const layerParams = `&LAYERS=${layer}`;

    const sourceProps: SourceProps = {
        id: TileUtility.getSourceIdFromTileId(id),
        type: "raster",
        tiles: [`${url}${defaultParams}${sizeParams}${layerParams}${formatParams}${styleParams}`],
        tileSize: size,
    };

    const layerProps: LayerProps = {
        id: id,
        type: "raster",
        paint: {
            "raster-opacity": isVisible ? layerOpacity : 0,
        },
        beforeId: beforeId,
    };

    return (
        <Source {...sourceProps}>
            <Layer {...layerProps} />
        </Source>
    );
};

export default WmsTile;

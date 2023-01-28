import { Layer, LayerProps } from "react-map-gl";

type DividerTileProps = {
    id: string;
    beforeId?: string;
};

const DividerTile: React.FC<DividerTileProps> = ({ id, beforeId }) => {
    const layerProps: LayerProps = {
        id: `${id}`,
        type: "background",
        paint: {
            "background-opacity": 0,
        },
        beforeId: beforeId,
    };

    return <Layer {...layerProps} />;
};

export default DividerTile;

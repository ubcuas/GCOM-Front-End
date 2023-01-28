import { useAppSelector } from "../../../../store";
import { selectGeometLayerStates } from "../../../../store/slices/mapLayersSlice";
import { GEOMET_URL } from "../../../../utils/geomet";
import WmsTile from "../../../../components/WmsTile";
import useNextLoadedTile from "../../../../utils/hooks/useNextLoadedTile";
import TileUtility from "../../../../utils/TileUtility";

type GeometLayersProps = {
    dividerId: string;
};

const GeometLayers: React.FC<GeometLayersProps> = ({ dividerId }) => {
    const geometLayerStates = useAppSelector(selectGeometLayerStates).slice().reverse();
    const { getNextLoadedTileId } = useNextLoadedTile(
        geometLayerStates,
        (geometLayerState) => TileUtility.getGeometTileIdFromLayer(geometLayerState.obj.id),
        dividerId
    );

    return (
        <>
            {geometLayerStates.map((layerState) => {
                const { obj: layer, opacity, isVisible } = layerState;
                const tileId = TileUtility.getGeometTileIdFromLayer(layer.id);
                return (
                    <WmsTile
                        key={tileId}
                        id={tileId}
                        url={GEOMET_URL}
                        layer={layer.id}
                        layerOpacity={opacity}
                        isVisible={isVisible}
                        beforeId={getNextLoadedTileId()}
                    />
                );
            })}
        </>
    );
};

export default GeometLayers;

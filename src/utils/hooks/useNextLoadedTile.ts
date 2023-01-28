import { useMap } from "react-map-gl";

const useNextLoadedTile = <T>(tileArr: T[], getTileId: (tile: T) => string, defaultId?: string) => {
    const { map } = useMap();

    let i = 1;

    const getNextLoadedTileId = (): string | undefined => {
        for (i; i < tileArr.length; i++) {
            if (map?.getLayer(getTileId(tileArr[i]))) {
                return getTileId(tileArr[i++]);
            }
        }
        return defaultId;
    };

    return { getNextLoadedTileId };
};

export default useNextLoadedTile;

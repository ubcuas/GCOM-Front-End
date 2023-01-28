export default class TileUtility {
    public static getSourceIdFromTileId = (id: string) => `${id}-source`;
    public static getTileIdFromSourceId = (source: string) => source.slice(0, -7);

    // layer: refers to actual GEOMET layer name in data
    //  and not the tile's Layer id (since actual Layer id  === tile id anyway)
    public static getGeometTileIdFromLayer = (layer: string) => `geomet-${layer}`;
}

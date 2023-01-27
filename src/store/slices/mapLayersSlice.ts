import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { GeometLayer } from "../../utils/geomet";

type MapLayersState = {
    firstSymbolLayer?: string;
    geometLayers: GeometLayerState[];
};

export type GeometLayerState = {
    obj: GeometLayer;
    opacity: number;
    isVisible: boolean;
};

const defaultState = {
    opacity: 0.5,
    isVisible: true,
};

const initialState: MapLayersState = {
    geometLayers: [] as GeometLayerState[],
};

export const mapLayersSlice = createSlice({
    name: "mapLayers",
    initialState,
    reducers: {
        updateFirstSymbolLayer: (state, action: PayloadAction<string | undefined>) => {
            state.firstSymbolLayer = action.payload;
        },
        addGeometLayer: (state, action: PayloadAction<GeometLayer>) => {
            state.geometLayers = [
                {
                    obj: action.payload,
                    ...defaultState,
                },
                ...state.geometLayers,
            ];
        },
        removeGeometLayer: (state, action: PayloadAction<GeometLayer>) => {
            state.geometLayers = state.geometLayers.filter((layer) => layer.obj.id !== action.payload.id);
        },
        updateGeometLayerState: (state, action: PayloadAction<GeometLayerState>) => {
            state.geometLayers = state.geometLayers.map((layerState) =>
                layerState.obj.id === action.payload.obj.id ? action.payload : layerState
            );
        },
        reorderGeometLayer: (state, action: PayloadAction<[number, number]>) => {
            const [oldIndex, newIndex] = action.payload;
            const [movedLayer] = state.geometLayers.splice(oldIndex, 1);
            state.geometLayers.splice(newIndex, 0, movedLayer);
        },
    },
});

export const selectFirstSymbolLayer = (state: RootState) => state.mapLayers.firstSymbolLayer;
export const selectGeometLayers = (state: RootState) =>
    state.mapLayers.geometLayers.map((layerState: GeometLayerState) => layerState.obj);
export const selectGeometLayerStates = (state: RootState) => state.mapLayers.geometLayers;

export const { updateFirstSymbolLayer, addGeometLayer, removeGeometLayer, updateGeometLayerState, reorderGeometLayer } =
    mapLayersSlice.actions;

const mapLayersReducer = mapLayersSlice.reducer;
export default mapLayersReducer;

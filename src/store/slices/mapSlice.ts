import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LngLatBoundsLike, ViewState } from "react-map-gl";
import { RootState } from "..";
import { MapProjections, MapStyles } from "../../utils/constants/enums/map";

type MapState = {
    props: {
        mapStyle: MapStyles;
        projection: MapProjections;
        maxBounds?: LngLatBoundsLike;
    };
    viewState: {
        mercator: Partial<ViewState>;
        globe: Partial<ViewState>;
    };
};

const initialState: MapState = {
    props: {
        mapStyle: MapStyles.Monochrome,
        projection: MapProjections.Mercator,
        maxBounds: [
            [-180, 5],
            [-30, 75],
        ],
    },
    viewState: {
        mercator: {
            longitude: -71.64686900382074,
            latitude: 48.51056103673244,
            zoom: 12.5,
        },
        globe: {
            longitude: -71.64686900382074,
            latitude: 48.51056103673244,
            zoom: 2,
        },
    },
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        updateMapViewState: (state, action: PayloadAction<Partial<ViewState>>) => {
            if (state.props.projection === MapProjections.Mercator) {
                state.viewState.mercator = action.payload;
            } else {
                state.viewState.globe = action.payload;
            }
        },
        updateMapProjection: (state, action: PayloadAction<MapProjections>) => {
            state.props.projection = action.payload;
            if (state.props.projection === MapProjections.Globe) {
                state.props.maxBounds = undefined;
            } else {
                state.props.maxBounds = initialState.props.maxBounds;
            }
        },
        updateMapStyle: (state, action: PayloadAction<MapStyles>) => {
            state.props.mapStyle = action.payload;
        },
    },
});

export const selectMapStyle = (state: RootState) => state.map.props.mapStyle;
export const selectMapProjection = (state: RootState) => state.map.props.projection;
export const selectMapViewState = (state: RootState) =>
    state.map.props.projection === MapProjections.Mercator ? state.map.viewState.mercator : state.map.viewState.globe;
export const selectMapProps = (state: RootState) => {
    return { ...selectMapViewState(state), ...state.map.props };
};
export const { updateMapViewState, updateMapProjection, updateMapStyle } = mapSlice.actions;

const mapReducer = mapSlice.reducer;
export default mapReducer;

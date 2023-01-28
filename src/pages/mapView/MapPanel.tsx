import Map, { MapboxEvent, MapStyleDataEvent } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateFirstSymbolLayer } from "../../store/slices/mapLayersSlice";
import { selectMapProps, updateMapViewState } from "../../store/slices/mapSlice";
import { MapStyles, MapStylesMonochrome } from "../../utils/constants/enums/map";
import useThemeMode from "../../utils/hooks/useThemeMode";
import MapLayers from "./mapPanel/MapLayers";
import MapMarkers from "./mapPanel/MapMarkers";

const MapPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { mapStyle, ...mapProps } = useAppSelector(selectMapProps);
    const { isDarkMode } = useThemeMode();

    const getMapStyle = () =>
        mapStyle === MapStyles.Monochrome
            ? isDarkMode()
                ? MapStylesMonochrome.Dark
                : MapStylesMonochrome.Light
            : mapStyle;

    // in order for other labels to render below the map text, the layer for map text has to be tracked
    const handleFirstSymbolLayer = (event: MapboxEvent | MapStyleDataEvent) => {
        const map = event.target;
        const layers = map.getStyle().layers;

        const { id: firstSymbolLayerId } = layers.find((layer) => layer.type === "symbol") ?? {};

        dispatch(updateFirstSymbolLayer(firstSymbolLayerId));
    };

    return (
        <Map
            {...mapProps}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            mapStyle={getMapStyle()}
            id="map"
            onMove={(e) => dispatch(updateMapViewState(e.viewState))}
            onLoad={handleFirstSymbolLayer}
            onStyleData={handleFirstSymbolLayer}
            style={{ height: "80vh" }}
            styleDiffing={false}
            reuseMaps
        >
            <MapLayers />
            <MapMarkers />
        </Map>
    );
};

export default MapPanel;

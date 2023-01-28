import React from "react";
import { useAppSelector } from "../../../store";
import { selectFirstSymbolLayer } from "../../../store/slices/mapLayersSlice";
import DividerTile from "./mapLayers/DividerTile";
import GeometLayers from "./mapLayers/GeometLayers";
import ObstacleLayer from "./mapLayers/ObstacleLayer";
import RouteLayer from "./mapLayers/RouteLayer";

const MapLayers: React.FC = () => {
    const firstSymbolLayer = useAppSelector(selectFirstSymbolLayer);

    const dividers: { [key: string]: { id: string; isAfterLabels?: boolean } } = {
        geomet: { id: "geomet-divider" },
        obstacle: { id: "obstacle-divider", isAfterLabels: true },
        route: { id: "route-divider", isAfterLabels: true },
    };

    return (
        <>
            {Object.values(dividers).map((divider) => (
                <DividerTile
                    key={divider.id}
                    id={divider.id}
                    beforeId={divider.isAfterLabels ? undefined : firstSymbolLayer}
                />
            ))}
            <GeometLayers dividerId={dividers.geomet.id} />
            <ObstacleLayer dividerId={dividers.obstacle.id} />
            <RouteLayer dividerId={dividers.route.id} />
        </>
    );
};

export default MapLayers;

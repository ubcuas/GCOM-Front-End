import fetchedCapabilities from "./capabilities.json";

export const GEOMET_URL = "https://geo.weather.gc.ca/geomet";
export const GEOMET_CAPABILITIES: GeometCapabilities = fetchedCapabilities as GeometCapabilities;

export type GeometCapabilities = {
    title: string;
    desc: string;
    layers: (GeometCategory | GeometLayer)[];
};

export type GeometCategory = {
    title: string;
    layers: (GeometCategory | GeometLayer)[];
};

export type GeometLayer = {
    title: string;
    desc: string;
    id: string;
    keywords?: string[];
};

export const isGeometLayer = (layer: GeometCategory | GeometLayer): layer is GeometLayer => {
    return (layer as GeometCategory).layers === undefined;
};

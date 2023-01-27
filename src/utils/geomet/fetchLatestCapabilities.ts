import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xml2json from "xml2json";

type CapabilityObject = {
    // FIELDS FROM XML
    Layer?: CapabilityObject | CapabilityObject[];
    Title?: string;
    Abstract?: string;
    Name?: string;
    KeywordList?: {
        Keyword: string[];
    };

    // PARSED FIELDS
    layers?: CapabilityObject[];
    title: string;
    desc?: string;
    id?: string;
    keywords?: string[];
};

const VALID_KEYS = ["Layer", "Title", "Abstract", "Name", "KeywordList"];

const handleObject = (obj?: CapabilityObject) => {
    if (!obj) {
        return;
    }

    // delete invalid keys
    Object.keys(obj).forEach((key) => VALID_KEYS.includes(key) || delete obj[key as keyof typeof obj]);

    // Name => id (only if it is a layer)
    if (!obj.Layer && obj.Name) {
        obj.id = obj.Name;
    }
    if (obj.Name) {
        delete obj.Name;
    }

    // Title => title
    if (obj.Title) {
        obj.title = obj.Title;
        delete obj.Title;
    }

    // Abstract => desc
    if (obj.Abstract) {
        obj.desc = obj.Abstract;
        delete obj.Abstract;
    }

    // KeywordList.Keyword => keywords (only if it is a layer)
    if (obj.KeywordList && !obj.Layer) {
        obj.keywords = obj.KeywordList.Keyword;
    }
    if (obj.KeywordList) {
        delete obj.KeywordList;
    }

    // Layer => layers
    if (obj.Layer) {
        if (!Array.isArray(obj.Layer)) {
            obj.Layer = [obj.Layer];
        }

        obj.layers = obj.Layer;
        delete obj.Layer;
    }

    // iterate over next object
    if (Array.isArray(obj.layers)) {
        obj.layers.forEach((o) => handleObject(o));
    } else if (obj) {
        handleObject(obj.layers);
    }

    return obj;
};

const fetchLatestCapabilities = async () => {
    const json = await axios
        .get("https://geo.weather.gc.ca/geomet?&service=WMS&version=1.3.0&request=GetCapabilities")
        .then((result) => xml2json.toJson(result.data));

    const obj = handleObject(JSON.parse(json).WMS_Capabilities.Capability.Layer);

    fs.writeFileSync(
        path.join(path.dirname(fileURLToPath(import.meta.url)), "capabilities.json"),
        JSON.stringify(obj, null, 4)
    );
};

fetchLatestCapabilities().then(() => {
    console.log("GeoMet capabilities successfully fetched.\n");
});

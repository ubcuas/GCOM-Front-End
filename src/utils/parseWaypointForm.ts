import { Waypoint } from "../types/Waypoint";
import { FormState } from "../types/WaypointForm";

const parseOptionalFloat = (field: string) => {
    const parsed = parseFloat(field);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export default function parseWaypointForm(formState: FormState): Waypoint {
    const lat = parseFloat(formState.lat);
    const long = parseFloat(formState.long);

    if (lat > 90 || lat < -90 || long > 180 || long < -180) {
        throw new Error(
            "Invalid latitude/longitude values. Must be between -90 and 90 for latitude and -180 and 180 for longitude.",
        );
    }

    return {
        lat: lat,
        long: long,
        alt: parseOptionalFloat(formState.alt),
        radius: parseOptionalFloat(formState.radius),
        name: formState.name.trim(),
        remarks: formState.remarks.trim(),
        id: "-1",
    };
}

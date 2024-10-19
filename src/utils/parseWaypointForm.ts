import { Waypoint } from "../types/Waypoint";
import { FormState } from "../types/WaypointForm";

const parseOptionalFloat = (field: string) => {
    const parsed = parseFloat(field);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export default function parseWaypointForm(formState: FormState): Waypoint {
    return {
        lat: parseFloat(formState.lat),
        long: parseFloat(formState.long),
        alt: parseOptionalFloat(formState.alt),
        radius: parseOptionalFloat(formState.radius),
        name: formState.name.trim(),
        remarks: formState.remarks.trim(),
        command: formState.command.trim(),
        param1: parseOptionalFloat(formState.param1),
        param2: parseOptionalFloat(formState.param2),
        param3: parseOptionalFloat(formState.param3),
        param4: parseOptionalFloat(formState.param4),
        id: "-1",
    };
}

import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Waypoint, WaypointEditState } from "../../types/Waypoint";
import { useAppDispatch } from "../../store/store";
import { addToQueuedWaypoints, editWaypointAtIndex } from "../../store/slices/appSlice";

// TODO: Needs a bit of cleaning up, im sure there are better logical flows for this form.

type WaypointFormProps = {
    editState: WaypointEditState;
    clearEditState: () => void;
};

type FormState = Record<keyof Omit<Waypoint, "id">, string>;

const defaultFormState: FormState = {
    lat: "",
    long: "",
    alt: "",
    name: "",
    radius: "",
    remarks: "",
    command: "",
    param1: "",
    param2: "",
    param3: "",
    param4: "",
};

type FormErrors = {
    lat: boolean;
    long: boolean;
    alt: boolean;
};

type FormKeys = keyof FormState & keyof FormErrors;

export default function WaypointForm({ editState, clearEditState }: WaypointFormProps) {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const [formErrors, setFormErrors] = useState<FormErrors>({
        lat: false,
        long: false,
        alt: false,
    });

    useEffect(() => {
        if (editState.waypoint) {
            setFormState({
                lat: editState.waypoint.lat ? String(editState.waypoint.lat) : "",
                long: editState.waypoint.long ? String(editState.waypoint.long) : "",
                alt: editState.waypoint.alt ? String(editState.waypoint.alt) : "",
                name: editState.waypoint.name ?? "No Name",
                radius: editState.waypoint.radius ? String(editState.waypoint.radius) : "",
                remarks: editState.waypoint.remarks ?? "",
                command: editState.waypoint.command ?? "",
                param1: editState.waypoint.param1 ? String(editState.waypoint.param1) : "",
                param2: editState.waypoint.param2 ? String(editState.waypoint.param2) : "",
                param3: editState.waypoint.param3 ? String(editState.waypoint.param3) : "",
                param4: editState.waypoint.param4 ? String(editState.waypoint.param4) : "",
            });
        } else {
            setFormState(defaultFormState);
        }
    }, [editState.index]);

    const checkReqFields = (keys: FormKeys[]): boolean => {
        const newFormErrors = keys.reduce((acc, key) => {
            const hasError = formState[key].trim() === "";
            return { ...acc, [key]: hasError };
        }, formErrors);

        setFormErrors(newFormErrors);

        return keys.every((key) => !newFormErrors[key]);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            ["lat", "long", "alt", "radius", "param1", "param2", "param3", "param4"].includes(event.target.id) &&
            /[^0-9.-]/.test(event.target.value)
        ) {
            return;
        }
        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        });
        setFormErrors({
            ...formErrors,
            [event.target.id]: !event.target.validity.valid,
        });
    };

    const handleFormSubmit = () => {
        if (checkReqFields(["lat", "long", "alt"])) {
            const waypoint = {
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
            } as Waypoint;
            dispatch(addToQueuedWaypoints(waypoint));
        }
    };

    const cancelEditing = () => {
        clearEditState();
        setFormState(defaultFormState);
    };

    const handleFinishEditing = () => {
        const waypoint = {
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
        } as Waypoint;
        dispatch(
            editWaypointAtIndex({
                index: editState.index,
                waypoint,
            }),
        );
        cancelEditing();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">{editState.waypoint ? "Edit" : "Create"} Waypoint</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="lat"
                    type="string"
                    label="Latitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.lat}
                    error={formErrors.lat}
                    helperText={formErrors.lat && "Latitude is required."}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="long"
                    type="string"
                    label="Longitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.long}
                    error={formErrors.long}
                    helperText={formErrors.long && "Longitude is required."}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="alt"
                    type="string"
                    label="Altitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.alt}
                    error={formErrors.alt}
                    helperText={formErrors.alt && "Altitude is required."}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    id="radius"
                    type="string"
                    label="Radius"
                    value={formState.radius}
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    autoComplete="off"
                    value={formState.name}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    autoComplete="off"
                    value={formState.remarks}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="command"
                    label="Command"
                    autoComplete="off"
                    value={formState.command}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TextField
                    fullWidth
                    id="param1"
                    type="string"
                    label="Param 1"
                    value={formState.param1}
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TextField
                    fullWidth
                    id="param2"
                    type="string"
                    label="Param 2"
                    value={formState.param2}
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TextField
                    fullWidth
                    id="param3"
                    type="string"
                    label="Param 3"
                    value={formState.param3}
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TextField
                    fullWidth
                    id="param4"
                    type="string"
                    label="Param 4"
                    value={formState.param4}
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                />
            </Grid>
            {editState.waypoint ? (
                <>
                    <Grid item xs={12} lg={6}>
                        <Button color="secondary" fullWidth variant="outlined" onClick={cancelEditing}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button fullWidth variant="outlined" onClick={handleFinishEditing}>
                            Edit Waypoint
                        </Button>
                    </Grid>
                </>
            ) : (
                <Grid item xs={12}>
                    <Button fullWidth variant="outlined" onClick={handleFormSubmit}>
                        Create Waypoint
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

const preventScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLElement) {
        e.target.blur();
    }
};

const parseOptionalFloat = (field: string) => {
    const parsed = parseFloat(field);
    return Number.isNaN(parsed) ? undefined : parsed;
};

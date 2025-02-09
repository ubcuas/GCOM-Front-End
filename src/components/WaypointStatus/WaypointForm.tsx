import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Waypoint, WaypointEditState } from "../../types/Waypoint";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { openSnackbar, selectAutoClearWaypoints } from "../../store/slices/appSlice";
import { FormErrors, FormKeys, FormState } from "../../types/WaypointForm";
import parseWaypointForm from "../../utils/parseWaypointForm";
import { useWaypoints } from "../../utils/useWaypoints";

// TODO: Needs a bit of cleaning up, im sure there are better logical flows for this form.

type WaypointFormProps = {
    isEditing: boolean;
    cancelEditing: () => void;
    submitForm: (waypoint: Waypoint) => void;
    initialEditingState?: Waypoint;
};

const defaultFormState: FormState = {
    lat: "",
    long: "",
    alt: "",
    name: "",
    radius: "",
    remarks: "",
};

export default function WaypointForm({ isEditing, cancelEditing, submitForm, initialEditingState }: WaypointFormProps) {
    const dispatch = useAppDispatch();
    const autoClearWaypoints = useAppSelector(selectAutoClearWaypoints);
    const [formState, setFormState] = useState<FormState>(defaultFormState);

    const [formErrors, setFormErrors] = useState<FormErrors>({
        lat: false,
        long: false,
        alt: false,
    });

    useEffect(() => {
        if (isEditing) {
            // TODO: bit ugly, could be improved in the future.
            setFormState({
                lat: initialEditingState?.lat ? String(initialEditingState.lat) : "",
                long: initialEditingState?.long ? String(initialEditingState.long) : "",
                alt: initialEditingState?.alt ? String(initialEditingState.alt) : "",
                name: initialEditingState?.name ?? "No Name",
                radius: initialEditingState?.radius ? String(initialEditingState.radius) : "",
                remarks: initialEditingState?.remarks ?? "",
            });
        } else {
            setFormState(defaultFormState);
        }
    }, [isEditing, initialEditingState]);

    const checkReqFields = (keys: FormKeys[]): boolean => {
        // TODO: This function (and FormError) can be updated so that it also checks Lat/Long are within correct bounds.
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

    const handleFormSubmit = async () => {
        try {
            if (!checkReqFields(["lat", "long", "alt"])) return;

            const waypoint = parseWaypointForm(formState);
            submitForm(waypoint);

            if (isEditing) {
                cancelEditing();
            }
        } catch (error) {
            const message = (error as Error).message;
            dispatch(openSnackbar(message));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">{isEditing ? "Edit" : "Create"} Waypoint</Typography>
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
            <Grid item xs={12} lg={12}>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    autoComplete="off"
                    value={formState.name}
                    onChange={handleFormChange}
                />
            </Grid>
            {isEditing ? (
                <>
                    <Grid item xs={12} lg={6}>
                        <Button color="secondary" fullWidth variant="outlined" onClick={cancelEditing}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button fullWidth variant="outlined" onClick={handleFormSubmit}>
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

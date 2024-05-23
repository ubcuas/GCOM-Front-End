import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Waypoint } from "../../types/Waypoint";
import { useAppDispatch } from "../../store/store";
import { addToQueuedWaypoints } from "../../store/slices/appSlice";

type FormState = {
    latitude: string;
    longitude: string;
    altitude: string;
    name: string;
    radius: string;
    remarks: string;
};

type FormErrors = {
    latitude: boolean;
    longitude: boolean;
    altitude: boolean;
};

type FormKeys = keyof FormState & keyof FormErrors;

export default function WaypointForm() {
    const dispatch = useAppDispatch();

    const [formState, setFormState] = useState<FormState>({
        latitude: "",
        longitude: "",
        altitude: "",
        name: "",
        radius: "",
        remarks: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        latitude: false,
        longitude: false,
        altitude: false,
    });

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
            !["latitude", "longitude", "altitude", "radius"].includes(event.target.id) ||
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
        if (checkReqFields(["latitude", "longitude", "altitude"])) {
            const waypoint = {
                lat: parseFloat(formState.latitude),
                long: parseFloat(formState.longitude),
                alt: parseOptionalFloat(formState.altitude),
                radius: parseOptionalFloat(formState.radius),
                name: formState.name.trim(),
                remarks: formState.remarks.trim(),
                id: "-1",
            } as Waypoint;
            dispatch(addToQueuedWaypoints(waypoint));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Create Waypoint</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="latitude"
                    type="string"
                    label="Latitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.latitude}
                    error={formErrors.latitude}
                    helperText={formErrors.latitude && "Latitude is required."}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="longitude"
                    type="string"
                    label="Longitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.longitude}
                    error={formErrors.longitude}
                    helperText={formErrors.longitude && "Longitude is required."}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    required
                    id="altitude"
                    type="string"
                    label="Altitude"
                    onChange={handleFormChange}
                    onWheel={preventScroll}
                    value={formState.altitude}
                    error={formErrors.altitude}
                    helperText={formErrors.altitude && "Altitude is required."}
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
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    autoComplete="off"
                    value={formState.name}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12}>
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
                <Button
                    sx={{
                        width: "100%",
                    }}
                    variant="outlined"
                    onClick={handleFormSubmit}
                >
                    Create Waypoint
                </Button>
            </Grid>
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

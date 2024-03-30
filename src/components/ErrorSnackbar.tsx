import { Alert, Fade, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type ErrorSnackbarProps = {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export type SnackbarState = {
    message: string;
    armed: boolean;
    takeoffAltitude?: number;
};

export default function ErrorSnackbar({ message, open, setOpen }: ErrorSnackbarProps) {
    return (
        <Snackbar TransitionComponent={Fade} open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert
                severity="error"
                variant="filled"
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpen(false)}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

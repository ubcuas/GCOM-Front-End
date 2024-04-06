import { Alert, Fade, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store/store";
import { closeSnackbar, selectSnackbar } from "../store/slices/appSlice";

export type ErrorSnackbarProps = {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function ErrorSnackbar() {
    const { message, open } = useAppSelector(selectSnackbar);
    const dispatch = useAppDispatch();

    return (
        <Snackbar
            TransitionComponent={Fade}
            open={open}
            autoHideDuration={5000}
            onClose={() => dispatch(closeSnackbar())}
        >
            <Alert
                severity="error"
                variant="filled"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => dispatch(closeSnackbar())}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

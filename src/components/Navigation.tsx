import { Link, Stack, useTheme } from "@mui/material";
import { Link as WouterLink } from "wouter";

const Navigation: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            gap={theme.spacing(5)}
            padding={theme.spacing(1, 4)}
            alignItems="center"
            height="10vh"
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
            <Link component={WouterLink} href="/">
                Home
            </Link>
            <Link component={WouterLink} href="/map">
                Map
            </Link>
            <Link component={WouterLink} href="/settings">
                Settings
            </Link>
        </Stack>
    );
};

export default Navigation;

import { Divider, Link, Stack, useTheme } from "@mui/material";

import { Link as WouterLink } from "wouter";

const Navigation: React.FC = () => {
    const theme = useTheme();

    return (
        <>
            <Stack direction="row" gap={theme.spacing(2)} padding={theme.spacing(1)}>
                <Link component={WouterLink} href="/">
                    Home
                </Link>
                <Link component={WouterLink} href="/map">
                    Map
                </Link>
            </Stack>
            <Divider />
        </>
    );
};

export default Navigation;

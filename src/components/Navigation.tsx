import { Stack, useTheme } from "@mui/material";
import InternalLink from "./InternalLink";
import Logo from "./Logo";

const Navigation: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            padding={2}
            alignItems="center"
            justifyContent="space-between"
            height="75px"
            width="100%"
            sx={{ borderBottom: `1px solid ${theme.palette.divider}`, position: "absolute" }}
        >
            <InternalLink href="/">
                <Logo height="44px" inheritColor />
            </InternalLink>
            <Stack direction="row" gap={5} paddingRight={2}>
                <InternalLink href="/map">Map</InternalLink>
                <InternalLink href="/scanner">Scanner</InternalLink>
                <InternalLink href="/settings">Settings</InternalLink>
            </Stack>
        </Stack>
    );
};

export default Navigation;

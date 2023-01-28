import { PropsWithChildren } from "react";
import { SxProps, Theme, TypographyVariant, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type DrawerHeaderProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
};

const DrawerHeader: React.FC<PropsWithChildren<DrawerHeaderProps>> = ({ variant = "h6", sx, children }) => {
    const theme = useTheme();

    return (
        <Typography variant={variant} sx={{ margin: theme.spacing(1, 2), ...sx }}>
            {children}
        </Typography>
    );
};

export default DrawerHeader;

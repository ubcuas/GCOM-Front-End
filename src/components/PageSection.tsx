import { Box, SxProps, Theme, Typography, TypographyVariant, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

type PageSectionProps = {
    height?: string;
};

const PageSection: React.FC<PropsWithChildren<PageSectionProps>> & {
    Header: typeof PageSectionHeader;
    Subheader: typeof PageSectionSubheader;
    Text: typeof PageSectionText;
} = ({ height, children }) => {
    return (
        <Box width="800px" height={height} margin="0 auto">
            {children}
        </Box>
    );
};

type PageSectionHeaderProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
};

const PageSectionHeader: React.FC<PropsWithChildren<PageSectionHeaderProps>> = ({ variant = "h4", sx, children }) => {
    const theme = useTheme();

    return (
        <Typography variant={variant} sx={sx} padding={theme.spacing(2, 0, 1, 0)}>
            {children}
        </Typography>
    );
};

type PageSectionSubheaderProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
};

const PageSectionSubheader: React.FC<PropsWithChildren<PageSectionSubheaderProps>> = ({
    variant = "h6",
    sx,
    children,
}) => {
    const theme = useTheme();

    return (
        <Typography variant={variant} sx={sx} padding={theme.spacing(0, 0, 1, 0)}>
            {children}
        </Typography>
    );
};

type PageSectionTextProps = {
    variant?: TypographyVariant;
    sx?: SxProps<Theme>;
};

const PageSectionText: React.FC<PropsWithChildren<PageSectionTextProps>> = ({ variant = "body2", sx, children }) => {
    const theme = useTheme();

    return (
        <Typography variant={variant} sx={sx} marginBottom={theme.spacing(2)}>
            {children}
        </Typography>
    );
};

PageSection.Header = PageSectionHeader;
PageSection.Subheader = PageSectionSubheader;
PageSection.Text = PageSectionText;

export default PageSection;

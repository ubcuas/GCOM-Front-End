import PlaceIcon from "@mui/icons-material/Place";
import { Box, SvgIcon, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { PaletteColor } from "@mui/material";
import { ColorPalette } from "../types/Theming";

type PlaceMarkerIconProps = {
    label?: string;
    color?: ColorPalette;
    htmlColor?: string;
    sx?: SxProps<Theme>;
};

const PlaceMarkerIcon: React.FC<PlaceMarkerIconProps> = ({ label, color = "primary", htmlColor, sx }) => {
    const theme = useTheme();
    const palette = theme.palette;

    const colorProps = htmlColor ? { htmlColor } : { color };
    const contrastText = htmlColor
        ? theme.palette.getContrastText(htmlColor)
        : (palette[colorProps.color as keyof typeof palette] as PaletteColor).contrastText;

    const getIconWithLabel = () => (
        <>
            <Box
                sx={{
                    borderRadius: "50%",
                    position: "absolute",
                    width: "100%",
                    height: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "7px",
                    color: contrastText,
                }}
            >
                <Typography variant="button">{label}</Typography>
            </Box>

            {/* PlaceIcon svg path edited to remove the hole in the middle */}
            <SvgIcon fontSize="large" {...colorProps}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </SvgIcon>
        </>
    );

    return <Box sx={sx}>{label ? getIconWithLabel() : <PlaceIcon fontSize="large" {...colorProps} />}</Box>;
};

export default PlaceMarkerIcon;

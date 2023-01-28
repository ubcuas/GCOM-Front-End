import PlaceIcon from "@mui/icons-material/Place";
import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { PaletteColor } from "@mui/material";
import { ColorPalette } from "../../../../../types/Theming";

type PlaceMarkerIconProps = {
    label?: string;
    color?: ColorPalette;
    isObstacle?: boolean;
};

const PlaceMarkerIcon: React.FC<PlaceMarkerIconProps> = ({ label, color = "primary", isObstacle }) => {
    color = isObstacle ? "error" : color;

    const theme = useTheme();
    const palette = theme.palette;
    const themeColor = palette[color as keyof typeof palette] as PaletteColor;

    const getIconWithLabel = () => (
        <>
            <Box // TODO switch flex display to Stack
                sx={{
                    borderRadius: "50%",
                    position: "absolute",
                    width: "100%",
                    height: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "7px",
                    color: themeColor.contrastText,
                }}
            >
                <Typography variant="button">{label}</Typography>
            </Box>

            {/* PlaceIcon svg path edited to remove the hole in the middle */}
            <SvgIcon fontSize="large" color={color}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </SvgIcon>
        </>
    );

    return isObstacle || label ? getIconWithLabel() : <PlaceIcon fontSize="large" color={color} />;
};

export default PlaceMarkerIcon;

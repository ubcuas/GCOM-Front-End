import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SvgIconProps, useTheme } from "@mui/material";

type ChevronIconProps = SvgIconProps & {
    isOpen: boolean;
};

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen, ...svgIconProps }) => {
    const theme = useTheme();

    return (
        <ChevronLeftIcon
            fontSize="inherit"
            {...svgIconProps}
            sx={{
                ...svgIconProps.sx,
                transform: `rotate(${isOpen ? "90deg" : "-90deg"})`,
                transition: theme.transitions.create("transform"),
            }}
        />
    );
};

export default ChevronIcon;

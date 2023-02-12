import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SxProps, Theme, useTheme } from "@mui/material";

type ChevronIconProps = {
    isOpen: boolean;
    sx?: SxProps<Theme>;
};

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen, sx }) => {
    const theme = useTheme();

    return (
        <ChevronLeftIcon
            fontSize="inherit"
            sx={{
                ...sx,
                transform: `rotate(${isOpen ? "90deg" : "-90deg"})`,
                transition: theme.transitions.create("transform"),
            }}
        />
    );
};

export default ChevronIcon;

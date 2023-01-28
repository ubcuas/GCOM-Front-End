import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";

type PlusIconProps = {
    remove?: boolean;
    fontSize?: "small" | "medium" | "large";
};

const PlusIcon: React.FC<PlusIconProps> = ({ remove, fontSize = "medium" }) => {
    const theme = useTheme();
    const transition = theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    });

    return (
        <ClearIcon
            fontSize={fontSize}
            sx={{
                transform: remove ? "rotate(0deg)" : "rotate(-45deg)",
                transition: transition,
            }}
        />
    );
};

export default PlusIcon;

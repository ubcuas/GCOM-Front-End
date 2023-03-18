import PlaceIcon from "@mui/icons-material/Place";
import ColorUtility from "../utils/ColorUtility";
import useThemeMode from "../utils/hooks/useThemeMode";

type PlaceIconForTableProps = {
    waypointId: number;
};

const PlaceIconForTable: React.FC<PlaceIconForTableProps> = ({ waypointId }) => {
    const { themeMode } = useThemeMode();

    return (
        <PlaceIcon
            fontSize="inherit"
            htmlColor={ColorUtility.getColorFamilyFromIndex(waypointId)[themeMode].main}
            sx={{ marginTop: "2px", marginBottom: "-2px" }}
        />
    );
};

export default PlaceIconForTable;

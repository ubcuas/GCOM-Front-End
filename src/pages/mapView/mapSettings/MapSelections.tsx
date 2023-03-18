import { Box, MenuItem } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
    selectMapProjection,
    selectMapStyle,
    updateMapProjection,
    updateMapStyle,
} from "../../../store/slices/mapSlice";
import { MapProjections, MapStyles } from "../../../utils/constants/enums/map";

const MapSelections: React.FC = () => {
    const dispatch = useAppDispatch();
    const mapStyle = useAppSelector(selectMapStyle);
    const mapProjection = useAppSelector(selectMapProjection);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                marginTop: 1,
            }}
        >
            <Dropdown
                id="map-style"
                label="Style"
                value={mapStyle}
                onChange={(value) => dispatch(updateMapStyle(value))}
            >
                {Object.keys(MapStyles).map((style) => (
                    <MenuItem value={MapStyles[style as keyof typeof MapStyles]} key={style}>
                        {style}
                    </MenuItem>
                ))}
            </Dropdown>
            <Dropdown
                id="map-projection"
                label="Projection"
                value={mapProjection}
                onChange={(value) => dispatch(updateMapProjection(value))}
            >
                {Object.keys(MapProjections).map((proj) => (
                    <MenuItem value={MapProjections[proj as keyof typeof MapProjections]} key={proj}>
                        {proj}
                    </MenuItem>
                ))}
            </Dropdown>
        </Box>
    );
};

export default MapSelections;

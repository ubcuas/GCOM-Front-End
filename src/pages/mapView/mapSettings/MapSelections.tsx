import { MenuItem } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectMapStyle, updateMapStyle } from "../../../store/slices/mapSlice";
import { MapStyles } from "../../../utils/constants/enums/map";

const MapSelections: React.FC = () => {
    const dispatch = useAppDispatch();
    const mapStyle = useAppSelector(selectMapStyle);

    return (
        <Dropdown id="map-style" label="Style" value={mapStyle} onChange={(value) => dispatch(updateMapStyle(value))}>
            {Object.keys(MapStyles).map((style) => (
                <MenuItem value={MapStyles[style as keyof typeof MapStyles]} key={style}>
                    {style}
                </MenuItem>
            ))}
        </Dropdown>
    );
};

export default MapSelections;

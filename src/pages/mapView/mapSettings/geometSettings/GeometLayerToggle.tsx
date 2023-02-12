import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ChevronIcon from "../../../../components/ChevronIcon";
import MapDrawer from "../../../../components/MapDrawer";
import PlusIcon from "../../../../components/PlusIcon";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { selectGeometLayers, removeGeometLayer, addGeometLayer } from "../../../../store/slices/mapLayersSlice";
import { GeometLayer, GeometCategory, isGeometLayer } from "../../../../utils/geomet";
import useOpen from "../../../../utils/hooks/useOpen";

type GeometLayerToggleProps = {
    layer: GeometLayer | GeometCategory;
    isMainCategory?: boolean;
    level?: number;
};

const GeometLayerToggle: React.FC<GeometLayerToggleProps> = ({ layer, isMainCategory, level = 0 }) => {
    const theme = useTheme();
    const { isOpen, toggleOpen } = useOpen();
    const selectedLayers = useAppSelector(selectGeometLayers);
    const dispatch = useAppDispatch();

    const topDividerProps = { borderTop: 1, borderColor: theme.palette.divider };

    if (isGeometLayer(layer)) {
        const isSelected = !!selectedLayers.find((selectedLayer) => selectedLayer.id === layer.id);
        const handleLayer = () => dispatch((isSelected ? removeGeometLayer : addGeometLayer)(layer));

        return (
            <Box sx={{ padding: theme.spacing(1), paddingLeft: theme.spacing(level * 3), ...topDividerProps }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ padding: theme.spacing(0.5) }}>
                    <IconButton size="small" onClick={handleLayer}>
                        <PlusIcon fontSize="small" remove={isSelected} />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {layer.title}
                    </Typography>
                </Stack>
                <MapDrawer.Text sx={{ paddingLeft: theme.spacing(3.25) }}>
                    <Box>{layer.desc}</Box>

                    <Box sx={{ marginTop: theme.spacing(1), textAlign: "right" }}>
                        <Typography variant="overline" lineHeight={0} sx={{ color: theme.palette.text.secondary }}>
                            {layer.keywords?.join(", ")}
                        </Typography>
                    </Box>
                </MapDrawer.Text>
            </Box>
        );
    }

    const size = isMainCategory ? "medium" : "small";

    return (
        <Stack sx={topDividerProps}>
            <Stack
                direction="row"
                alignItems="center"
                onClick={toggleOpen}
                sx={{
                    padding: theme.spacing(isMainCategory ? 1 : 0.5),
                    paddingLeft: theme.spacing(1),
                    cursor: "pointer",
                }}
            >
                <IconButton size={size} disableRipple>
                    <ChevronIcon
                        isOpen={isOpen}
                        sx={{
                            marginLeft: theme.spacing(level * 3),
                        }}
                    />
                </IconButton>
                <Typography variant={isMainCategory ? "h6" : "subtitle1"} sx={{ fontWeight: 500 }}>
                    {layer.title}
                </Typography>
            </Stack>
            <Collapse in={isOpen} unmountOnExit>
                {layer.layers.map((layer) => (
                    <GeometLayerToggle layer={layer} key={layer.title} level={level + 1} />
                ))}
            </Collapse>
        </Stack>
    );
};

export default GeometLayerToggle;

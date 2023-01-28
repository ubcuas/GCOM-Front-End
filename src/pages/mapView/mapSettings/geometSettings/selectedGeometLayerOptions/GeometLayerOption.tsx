import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import OpacityIcon from "@mui/icons-material/Opacity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { mergeRefs } from "react-merge-refs";
import { GeometLayerState } from "../../../../../store/slices/mapLayersSlice";
import { useAppDispatch } from "../../../../../store";
import { removeGeometLayer, updateGeometLayerState } from "../../../../../store/slices/mapLayersSlice";
import useHover from "../../../../../utils/hooks/useHover";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import PlusIcon from "../../../../../components/PlusIcon";

type GeometLayerOptionProps = {
    layerState: GeometLayerState;
    isDragging?: boolean;
    isDropAnimating?: boolean;
    disableHover?: boolean;
    innerRef?: (element?: HTMLElement | null) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
    dragHandleProps?: DraggableProvidedDragHandleProps;
    draggableProps?: DraggableProvidedDraggableProps;
};

const GeometLayerOption: React.FC<GeometLayerOptionProps> = ({
    layerState,
    isDragging,
    disableHover,
    innerRef,
    dragHandleProps,
    draggableProps,
}) => {
    const { palette, transitions, spacing } = useTheme();
    const [hoverRef, isHovered] = useHover();
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useAppDispatch();

    const shouldBeHovered = (isHovered && !disableHover) || isClicked;
    const ref = innerRef ? mergeRefs([innerRef, hoverRef]) : hoverRef;

    useEffect(() => {
        if (!isDragging) {
            setIsClicked(false);
        }
    }, [isDragging]);

    return (
        <Stack
            ref={ref}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{
                padding: spacing(1),
                position: "relative",
                backgroundColor: palette.background.default,
                "&::before": {
                    content: "''",
                    backgroundColor: isClicked ? palette.action.hover : "transparent",
                    transition: transitions.create("background-color", {
                        duration: transitions.duration.shortest,
                    }),
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    position: "absolute",
                },
            }}
            {...draggableProps}
        >
            <Stack spacing={0} direction="row" alignItems="center">
                <Fade in={shouldBeHovered}>
                    <IconButton
                        edge="start"
                        size="small"
                        disableRipple
                        {...dragHandleProps}
                        onMouseDown={() => setIsClicked(true)}
                        onMouseUp={() => setIsClicked(false)}
                        sx={{
                            cursor: isClicked ? "grabbing !important" : "grab",
                        }}
                    >
                        <DragIndicatorIcon fontSize="small" />
                    </IconButton>
                </Fade>
                <IconButton
                    edge="end"
                    size="small"
                    onClick={() =>
                        dispatch(
                            updateGeometLayerState({
                                ...layerState,
                                isVisible: !layerState.isVisible,
                            })
                        )
                    }
                >
                    {layerState.isVisible ? (
                        <VisibilityIcon fontSize="small" />
                    ) : (
                        <VisibilityOffIcon fontSize="small" />
                    )}
                </IconButton>
            </Stack>
            <Typography variant="body2" noWrap sx={{ flexGrow: 1, zIndex: 1 }}>
                {/* TODO tooltip on overflow ? */}
                {layerState.obj.title}
            </Typography>
            <Stack
                spacing={0}
                direction="row"
                alignItems="center"
                sx={{
                    width: "140px",
                    flexShrink: 0,
                    paddingRight: spacing(0.5),
                }}
            >
                <IconButton disabled={!layerState.isVisible} size="small" sx={{ cursor: "default" }} disableRipple>
                    <OpacityIcon fontSize="small" />
                    {/* TODO transitions on opacity ? */}
                    {/* TODO use IconButton styling without actually using the component ? */}
                </IconButton>
                <Slider
                    value={layerState.opacity}
                    size="small"
                    valueLabelDisplay="auto"
                    min={0}
                    max={1}
                    step={0.01}
                    valueLabelFormat={(value: number) => `${Math.trunc(value * 100)}%`}
                    onChange={(_event: Event, newValue: number | number[]) => {
                        if (typeof newValue === "number") {
                            dispatch(
                                updateGeometLayerState({
                                    ...layerState,
                                    opacity: newValue,
                                })
                            );
                        }
                    }}
                    disabled={!layerState.isVisible}
                />
            </Stack>
            <Fade in={shouldBeHovered}>
                <IconButton size="small" onClick={() => dispatch(removeGeometLayer(layerState.obj))}>
                    <PlusIcon fontSize="small" remove />
                </IconButton>
            </Fade>
        </Stack>
    );
};

export default GeometLayerOption;

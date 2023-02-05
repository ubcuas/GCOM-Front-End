import { css } from "@emotion/react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import OpacityIcon from "@mui/icons-material/Opacity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack, IconButton, Typography, Slider, useTheme } from "@mui/material";
import { useDragControls, Reorder, motion } from "framer-motion";
import { useState } from "react";
import PlusIcon from "../../../../../components/PlusIcon";
import { useAppDispatch } from "../../../../../store";
import {
    GeometLayerState,
    updateGeometLayerState,
    removeGeometLayer,
} from "../../../../../store/slices/mapLayersSlice";

type ReorderableGeometLayerOptionProps = {
    layerState: GeometLayerState;
    onRelease?: () => void;
};

const ReorderableGeometLayerOption: React.FC<ReorderableGeometLayerOptionProps> = ({ layerState, onRelease }) => {
    const dragControls = useDragControls();
    const theme = useTheme();
    const [isClicked, setIsClicked] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useAppDispatch();

    const isClickedOrDragging = isClicked || isDragging;
    const transitionOptions = { duration: theme.transitions.duration.shortest };

    return (
        <Reorder.Item
            value={layerState}
            dragListener={false}
            dragControls={dragControls}
            onDragStart={() => {
                setIsClicked(false);
                setIsDragging(true);
            }}
            onUpdate={(e) => {
                // necessary since onAnimationComplete and onLayoutAnimationComplete do not work as expected
                if (e.y === 0) setIsDragging(false);
            }}
            as="div"
            css={css`
                background-color: ${theme.palette.background.default};
                position: relative;

                &::before {
                    content: "";
                    width: 100%;
                    height: 100%;
                    inset: 0;
                    position: absolute;
                    cursor: ${isClickedOrDragging ? "grabbing" : "default"};
                    z-index: ${isClickedOrDragging ? 998 : "unset"};
                }

                .hidden-icon {
                    opacity: ${isClickedOrDragging ? 1 : 0};
                    transition: ${theme.transitions.create("opacity", transitionOptions)};
                }

                &:active .hidden-icon,
                &:hover .hidden-icon {
                    opacity: 1;
                }
            `}
        >
            <motion.div exit={{ height: 0 }} transition={{ delay: 0.05 }}>
                <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    sx={{
                        padding: theme.spacing(1),
                        position: "relative",
                        backgroundColor: isClickedOrDragging ? theme.palette.action.hover : "transparent",
                        transition: theme.transitions.create("background-color", transitionOptions),
                    }}
                    component={motion.div}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <Stack spacing={0} direction="row" alignItems="center">
                        <IconButton
                            className="hidden-icon"
                            edge="start"
                            size="small"
                            disableRipple
                            onPointerDown={(e) => dragControls.start(e)}
                            onPointerUp={onRelease}
                            onTapStart={() => setIsClicked(true)}
                            onTap={() => setIsClicked(false)}
                            sx={{
                                cursor: isClickedOrDragging ? "grabbing" : "grab",
                                zIndex: 999,
                            }}
                            component={motion.button}
                        >
                            <DragIndicatorIcon fontSize="small" />
                        </IconButton>
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
                    <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
                        {layerState.obj.title}
                    </Typography>
                    <Stack
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        sx={{
                            width: "140px",
                            flexShrink: 0,
                            paddingRight: theme.spacing(0.5),
                        }}
                    >
                        <IconButton
                            disabled={!layerState.isVisible}
                            size="small"
                            sx={{ cursor: "default" }}
                            disableRipple
                        >
                            <OpacityIcon fontSize="small" />
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
                    <IconButton
                        className="hidden-icon"
                        size="small"
                        onClick={() => dispatch(removeGeometLayer(layerState.obj))}
                    >
                        <PlusIcon fontSize="small" remove />
                    </IconButton>
                </Stack>
            </motion.div>
        </Reorder.Item>
    );
};

export default ReorderableGeometLayerOption;

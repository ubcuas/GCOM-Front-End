import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import OpacityIcon from "@mui/icons-material/Opacity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack, IconButton, useTheme, Typography } from "@mui/material";
import { Reorder, useDragControls } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
    GeometLayerState,
    reorderGeometLayer,
    selectGeometLayerStates,
    updateGeometLayerStates,
} from "../../../../store/slices/mapLayersSlice";
import GeometLayerOption from "./selectedGeometLayerOptions/GeometLayerOption";
import { css } from "@emotion/react";

type ReorderableGeometLayerOptionsProps = {
    layerState: GeometLayerState;
    onRelease?: () => void;
};

const ReorderableGeometLayerOptions: React.FC<ReorderableGeometLayerOptionsProps> = ({ layerState, onRelease }) => {
    const dragControls = useDragControls();
    const theme = useTheme();
    const [isClicked, setIsClicked] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const isClickedOrDragging = isClicked || isDragging;
    const transitionOptions = { duration: theme.transitions.duration.shortest };

    return (
        <Reorder.Item
            value={layerState}
            dragListener={false}
            dragControls={dragControls}
            onTapStart={() => setIsClicked(true)}
            onTap={() => setIsClicked(false)}
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
                padding: ${theme.spacing(1)};
                position: relative;
                display: flex;
                align-items: center;
                gap: ${theme.spacing(1)};
                background-color: ${isClickedOrDragging ? "red" : "blue"};

                &::before,
                &::after {
                    content: "";
                    width: 100%;
                    height: 100%;
                    inset: 0;
                    position: absolute;
                    background-color: ${isClickedOrDragging ? theme.palette.background.default : "transparent"};
                    transition: ${theme.transitions.create("background-color", transitionOptions)};
                }

                &::before {
                    z-index: -2;
                }

                &::after {
                    // background-color: ${isClickedOrDragging ? theme.palette.action.hover : "transparent"};
                    z-index: -1;
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
            <Stack spacing={0} direction="row" alignItems="center">
                <IconButton
                    className="hidden-icon"
                    edge="start"
                    size="small"
                    disableRipple
                    onPointerDown={(e) => dragControls.start(e)}
                    onPointerUp={onRelease}
                    sx={{
                        cursor: "grab",
                    }}
                >
                    <DragIndicatorIcon fontSize="small" />
                </IconButton>
                <IconButton edge="end" size="small">
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
        </Reorder.Item>
    );
};

type SelectedGeometLayerOptionsProps = {
    displayOnEmpty?: ReactElement;
};

const SelectedGeometLayerOptions: React.FC<SelectedGeometLayerOptionsProps> = ({ displayOnEmpty }) => {
    const geometLayerStates = useAppSelector(selectGeometLayerStates);
    const dispatch = useAppDispatch();
    const [layerStates, setLayerStates] = useState(geometLayerStates);

    useEffect(() => {
        setLayerStates(geometLayerStates);
    }, [geometLayerStates]);

    if (geometLayerStates.length === 0) {
        return displayOnEmpty ?? <></>;
    }

    return (
        <Reorder.Group values={layerStates} onReorder={setLayerStates} as="div">
            {layerStates.map((layerState) => (
                <ReorderableGeometLayerOptions
                    layerState={layerState}
                    onRelease={() => dispatch(updateGeometLayerStates(layerStates))}
                    key={layerState.obj.id}
                />
            ))}
        </Reorder.Group>
    );
};

export default SelectedGeometLayerOptions;

import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { reorderGeometLayer, selectGeometLayerStates } from "../../../../store/slices/mapLayersSlice";
import GeometLayerOption from "./selectedGeometLayerOptions/GeometLayerOption";

const SelectedGeometLayerOptions: React.FC = () => {
    const geometLayerStates = useAppSelector(selectGeometLayerStates);

    if (geometLayerStates.length === 0) {
        return <></>;
    }

    const dispatch = useAppDispatch();
    const theme = useTheme();

    let disableHover = false;

    const handleDragStart = () => (disableHover = true);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        disableHover = false;

        if (destination) {
            dispatch(reorderGeometLayer([source.index, destination.index]));
        }
    };

    return (
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Droppable droppableId="geometDroppable">
                {(provided, _snapshot) => (
                    <Stack ref={provided.innerRef} {...provided.droppableProps} sx={{ marginBottom: theme.spacing(1) }}>
                        <TransitionGroup>
                            {geometLayerStates.map((layerState, i) => (
                                <Collapse key={layerState.obj.id}>
                                    <Draggable draggableId={`geometDraggable-${layerState.obj.id}`} index={i}>
                                        {(provided, snapshot) => (
                                            <GeometLayerOption
                                                key={layerState.obj.id}
                                                layerState={layerState}
                                                disableHover={disableHover}
                                                isDragging={snapshot.isDragging}
                                                {...provided}
                                            />
                                        )}
                                    </Draggable>
                                </Collapse>
                            ))}
                            {provided.placeholder}
                        </TransitionGroup>
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SelectedGeometLayerOptions;

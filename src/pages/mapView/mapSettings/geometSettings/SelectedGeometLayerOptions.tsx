import { css } from "@emotion/react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectGeometLayerStates, updateGeometLayerStates } from "../../../../store/slices/mapLayersSlice";
import ReorderableGeometLayerOption from "./selectedGeometLayerOptions/ReorderableGeometLayerOption";

type SelectedGeometLayerOptionsProps = {
    displayOnEmpty?: ReactElement;
};

const SelectedGeometLayerOptions: React.FC<SelectedGeometLayerOptionsProps> = ({ displayOnEmpty }) => {
    const geometLayerStates = useAppSelector(selectGeometLayerStates);
    const [layerStates, setLayerStates] = useState(geometLayerStates); // TODO: EXPLAIN WHY
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLayerStates(geometLayerStates);
    }, [geometLayerStates]);

    return (
        <Reorder.Group
            values={layerStates}
            onReorder={setLayerStates}
            as="div"
            css={css`
                min-height: 46px;
            `}
            layout
            layoutRoot
        >
            <AnimatePresence>
                {geometLayerStates.length === 0 && displayOnEmpty && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "46px" }}
                        transition={{ delay: 0.3, bounce: 0, duration: 0.05 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.15 }}
                        >
                            {displayOnEmpty}
                        </motion.div>
                    </motion.div>
                )}

                {layerStates.map((layerState) => (
                    <ReorderableGeometLayerOption
                        layerState={layerState}
                        onRelease={() => dispatch(updateGeometLayerStates(layerStates))}
                        key={layerState.obj.id}
                    />
                ))}
            </AnimatePresence>
        </Reorder.Group>
    );
};

export default SelectedGeometLayerOptions;

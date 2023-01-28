import DrawerHeader from "../../../components/DrawerHeader";
import SelectedGeometLayerOptions from "./geometSettings/SelectedGeometLayerOptions";

const GeometSettings: React.FC = () => {
    return (
        <>
            <DrawerHeader>Geomet Layers</DrawerHeader>
            <SelectedGeometLayerOptions />
        </>
    );
};

export default GeometSettings;

import CollapsibleTable from "../../../components/CollapsibleTable";
import { useAppSelector } from "../../../store";
import { selectWaypoints } from "../../../store/slices/dataSlice";
import { TableColumn } from "../../../types/Table";
import { Waypoint } from "../../../types/Waypoint";

const WaypointTable: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);

    const columns: TableColumn<Waypoint>[] = [
        {
            title: "ID",
            accessor: (waypoint) => waypoint.id,
            noStretch: true,
        },
        {
            title: "Name",
            accessor: (waypoint) => waypoint.name,
        },
        {
            title: "Lat",
            accessor: (waypoint) => waypoint.latitude,
        },
        {
            title: "Lon",
            accessor: (waypoint) => waypoint.longitude,
        },
        {
            title: "Alt",
            accessor: (waypoint) => waypoint.altitude,
        },
        {
            icon: true,
            accessor: (waypoint) => waypoint.remarks,
            sx: { paddingLeft: 0, textAlign: "right" },
        },
    ];

    return <CollapsibleTable columns={columns} rows={waypoints} />;
};

export default WaypointTable;

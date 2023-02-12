import CollapsibleTable from "../../../components/CollapsibleTable";
import { useAppSelector } from "../../../store";
import { selectWaypoints } from "../../../store/slices/dataSlice";
import { TableColumn, TableColumnType, TableExpansionProps } from "../../../types/Table";
import { Waypoint } from "../../../types/Waypoint";

const WaypointTable: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);

    const columns: TableColumn<Waypoint>[] = [
        {
            title: "ID",
            noStretch: true,
            accessor: (waypoint) => waypoint.id,
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
            type: TableColumnType.Info,
            cellSx: { paddingLeft: 0, textAlign: "right" },
            accessor: (waypoint) => waypoint.remarks,
        },
    ];

    return <CollapsibleTable columns={columns} rows={waypoints} />;
};

export default WaypointTable;

import CollapsibleTable from "../../../components/CollapsibleTable";
import PlaceIconForTable from "../../../icons/PlaceIconForTable";
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
            sx: { paddingRight: 0 },
        },
        {
            accessor: (waypoint) => <PlaceIconForTable waypointId={waypoint.id} />,
            noStretch: true,
            sx: { paddingRight: 0 },
        },
        {
            title: "Name",
            accessor: (waypoint) => waypoint.name,
            sx: { paddingLeft: 0.5 },
        },
        {
            title: "Latitude",
            accessor: (waypoint) => waypoint.latitude,
            noStretch: true,
        },
        {
            title: "Longitude",
            accessor: (waypoint) => waypoint.longitude,
            noStretch: true,
        },
        // {
        //     title: "Altitude",
        //     accessor: (waypoint) => waypoint.altitude,
        //     noStretch: true,
        // },
    ];

    return <CollapsibleTable columns={columns} rows={waypoints} />;
};

export default WaypointTable;

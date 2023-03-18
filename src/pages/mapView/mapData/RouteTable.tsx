import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CollapsibleTable from "../../../components/CollapsibleTable";
import PlaceIconForTable from "../../../icons/PlaceIconForTable";
import { useAppSelector } from "../../../store";
import { selectRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import { AEACRoute } from "../../../types/AEAC";
import { TableColumn, TableExpansionProps } from "../../../types/Table";
import WaypointUtility from "../../../utils/WaypointUtility";

const RouteTable: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);

    const columns: TableColumn<AEACRoute>[] = [
        {
            accessor: (route) => route.order,
            noStretch: true,
        },
        {
            title: "Start",
            accessor: (route) => route.start_waypoint,
            sx: { textAlign: "right", paddingRight: 0.5 },
        },
        {
            accessor: (route) => (
                <PlaceIconForTable waypointId={WaypointUtility.getId(route.start_waypoint, waypoints)} />
            ),
            noStretch: true,
            sx: { paddingLeft: 0, paddingRight: 0 },
        },
        {
            accessor: () => <ArrowRightAltIcon fontSize="inherit" sx={{ marginTop: "3px", marginBottom: "-3px" }} />,
            noStretch: true,
            sx: { paddingLeft: 0.5, paddingRight: 0.5 },
        },
        {
            accessor: (route) => (
                <PlaceIconForTable waypointId={WaypointUtility.getId(route.end_waypoint, waypoints)} />
            ),
            noStretch: true,
            sx: { paddingLeft: 0, paddingRight: 0 },
        },
        {
            title: "End",
            accessor: (route) => route.end_waypoint,
            sx: { paddingLeft: 0.5 },
        },
        {
            title: "Value",
            accessor: (route) => `$${route.value.toFixed(2)}`,
            sx: { textAlign: "right" },
        },
        {
            icon: true,
            accessor: (route) => route.remarks,
            noStretch: true,
            fadeOnOpen: true,
            sx: { paddingLeft: 0 },
        },
    ];

    return <CollapsibleTable columns={columns} rows={routes} expansion={RouteExpansion} />;
};

const RouteExpansion: React.FC<TableExpansionProps<AEACRoute>> = ({ data: route }) => {
    return (
        <>
            <b>ID:</b> {route.id}
            <br />
            <b>Number:</b> {route.number}
            <br />
            <b>Passengers:</b> {route.passengers}
            <br />
            <b>Max vehicle weight:</b> {route.max_vehicle_weight}kg
            {!!route.remarks && (
                <>
                    <br />
                    <b>Remarks:</b> {route.remarks}
                </>
            )}
        </>
    );
};

export default RouteTable;

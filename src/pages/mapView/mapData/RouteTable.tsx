import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CollapsibleTable from "../../../components/CollapsibleTable";
import { useAppSelector } from "../../../store";
import { selectRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import { Route } from "../../../types/Route";
import { TableColumn, TableColumnType, TableExpansionProps } from "../../../types/Table";
import WaypointUtility from "../../../utils/WaypointUtility";

const RouteTable: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);

    const columns: TableColumn<Route>[] = [
        {
            noStretch: true,
            accessor: (route) => route.order,
        },
        {
            title: "Start",
            noStretch: true,
            cellSx: { textAlign: "right", paddingRight: 1 },
            accessor: (route) => WaypointUtility.getNameById(route.start_waypoint, waypoints),
        },
        {
            noStretch: true,
            cellSx: { paddingLeft: 0, paddingRight: 0 },
            accessor: () => <ArrowRightAltIcon fontSize="inherit" sx={{ margin: "2px 0 -2px 0" }} />,
        },
        {
            title: "End",
            noStretch: true,
            cellSx: { paddingLeft: 1 },
            accessor: (route) => WaypointUtility.getNameById(route.end_waypoint, waypoints),
        },
        {
            title: "Value",
            accessor: (route) => route.value,
        },
        {
            type: TableColumnType.Info,
            cellSx: { paddingLeft: 0, textAlign: "right" },
            accessor: (route) => route.remarks,
        },
    ];

    return <CollapsibleTable columns={columns} rows={routes} expansion={RouteExpansion} />;
};

const RouteExpansion: React.FC<TableExpansionProps<Route>> = ({ data: route }) => {
    return (
        <>
            <b>ID:</b> {route.id}
            <br />
            <b>Number:</b> {route.number}
            <br />
            <b>Passengers:</b> {route.passengers}
            <br />
            <b>Remarks:</b> {route.remarks}
        </>
    );
};

export default RouteTable;

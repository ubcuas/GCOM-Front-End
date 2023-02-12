import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CollapsibleTable from "../../../components/CollapsibleTable";
import { useAppSelector } from "../../../store";
import { selectRoutes, selectWaypoints } from "../../../store/slices/dataSlice";
import { Route } from "../../../types/Route";
import { TableColumn, TableExpansionProps } from "../../../types/Table";
import WaypointUtility from "../../../utils/WaypointUtility";

const RouteTable: React.FC = () => {
    const waypoints = useAppSelector(selectWaypoints);
    const routes = useAppSelector(selectRoutes);

    const columns: TableColumn<Route>[] = [
        {
            accessor: (route) => route.order,
            noStretch: true,
        },
        {
            title: "Start",
            accessor: (route) => WaypointUtility.getNameById(route.start_waypoint, waypoints),
            noStretch: true,
            sx: { textAlign: "right", paddingRight: 1 },
        },
        {
            noStretch: true,
            accessor: () => <ArrowRightAltIcon fontSize="inherit" sx={{ marginTop: "2px", marginBottom: "-2px" }} />,
            sx: { paddingLeft: 0, paddingRight: 0 },
        },
        {
            title: "End",
            accessor: (route) => WaypointUtility.getNameById(route.end_waypoint, waypoints),
            noStretch: true,
            sx: { paddingLeft: 1 },
        },
        {
            title: "Value",
            accessor: (route) => route.value,
        },
        {
            icon: true,
            accessor: (route) => route.remarks,
            fadeOnOpen: true,
            sx: { paddingLeft: 0, textAlign: "right" },
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

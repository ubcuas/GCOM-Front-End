import { useEffect, useState } from "react";
import { Waypoint } from "../types/Waypoint";
import {
    createWaypointQuery,
    deleteWaypointQuery,
    getWaypointsQuery,
    reorderWaypointsQuery,
    updateWaypointQuery,
} from "../api/endpoints";

export const useWaypoints = () => {
    // Null signifies that waypoints have not been fetched yet
    const [waypoints, setWaypoints] = useState<Waypoint[] | null>(null);

    const fetchAndSetWaypoints = async () => setWaypoints(await getWaypointsQuery());
    useEffect(() => {
        fetchAndSetWaypoints();
    }, []);

    const createWaypoint = async (waypoint: Waypoint) => {
        if (waypoints !== null) {
            await createWaypointQuery(waypoint);
            setWaypoints([...waypoints, waypoint]);
        }
    };

    const deleteWaypoint = async (id: string) => {
        await deleteWaypointQuery(id);
        setWaypoints((wp) => wp?.filter((waypoint) => waypoint.id !== id) || []);
    };

    const editWaypoint = async (waypoint: Waypoint) => {
        setWaypoints((wp) => wp?.map((w) => (w.id === waypoint.id ? waypoint : w)) || []);
        await updateWaypointQuery(waypoint);
    };

    const reorderWaypoints = async (waypointIds: string[]) => {
        await reorderWaypointsQuery(waypointIds);

        // Reorders waypoints by id
        setWaypoints((curr) => {
            return waypointIds.reduce((acc, id) => {
                const wp = curr?.find((w) => w.id === id);
                if (!wp) return acc;

                acc.push(wp);
                return acc;
            }, [] as Waypoint[]);
        });
    };

    return { waypoints, createWaypoint, deleteWaypoint, editWaypoint, reorderWaypoints };
};

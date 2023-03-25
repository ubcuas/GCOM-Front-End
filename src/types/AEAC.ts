import { Waypoint } from "./Waypoint";

export type AEACRoute = {
    id: number;
    number: number; // provided by competition handlers, not trusted to be unique
    start_waypoint: string;
    end_waypoint: string;
    passengers: number;
    max_vehicle_weight: number;
    value: number;
    remarks?: string; // TODO: is this nullable?
    order: number; // TODO: is this nullable in endpoint/response data?
};

export type RestrictedArea = {
    id: number;
    bounds: Waypoint[]; // TODO: why not just string for waypoint names like above
    rejoin_at: Waypoint;
};

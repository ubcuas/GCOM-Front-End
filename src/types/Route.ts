export type Route = {
    id: number; //
    number: number; // provided by competition handlers, not trusted to be unique
    start_waypoint: number; // waypoint id
    end_waypoint: number; // waypoint id
    passengers: number;
    value: number;
    remarks: string;
    order: number; // order of route completion
};

export type AEACRoute = {
    id: number;
    number: number; // provided by competition handlers, not trusted to be unique
    start_waypoint: string;
    max_vehicle_weight: number;
    passengers: number;
    value: number;
    remarks?: string;
    order: number; // order of route completion
};

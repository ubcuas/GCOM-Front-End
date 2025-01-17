import { Waypoint } from "./Waypoint";

export type FormState = Record<keyof Omit<Waypoint, "id" | "order">, string>;

export type FormErrors = {
    lat: boolean;
    long: boolean;
    alt: boolean;
};

export type FormKeys = keyof FormState & keyof FormErrors;

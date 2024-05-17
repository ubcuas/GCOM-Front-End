import { useAppDispatch, useAppSelector } from "../store/store";
import { selectAircraftStatus, updateAircraftStatus } from "../store/slices/dataSlice";
import InfoCard from "./InfoCard";
import PositionSection from "./DroneStatus/PositionSection";
import SpeedSection from "./DroneStatus/SpeedSection";
import TimeStamp from "./DroneStatus/TimeStamp";
import MPSControlSection from "./DroneStatus/MPSControlSection";
import { useEffect } from "react";
import { socket } from "../api/socket";
import { AircraftStatus } from "../types/AircraftStatus";

const roundValues = (
    data: Omit<AircraftStatus, "verticalSpeed" | "speed"> & { vertical_velocity: number; velocity: number },
) => {
    return {
        timestamp: Math.round(data.timestamp),
        latitude: Math.round(data.latitude * 1000000) / 1000000,
        longitude: Math.round(data.longitude * 1000000) / 1000000,
        altitude: Math.round(data.altitude),
        verticalSpeed: Math.round(data.vertical_velocity),
        speed: Math.round(data.velocity),
        heading: Math.round(data.heading),
        voltage: Math.round(data.voltage * 100) / 100,
    } satisfies AircraftStatus;
};

export default function DroneStatusCard() {
    const droneState = useAppSelector(selectAircraftStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // socket.emit("ping");
        // socket.on("pong", () => {
        //     console.log("pong received");
        // });
        socket.on("fe_response", (data) => {
            console.log(data);
            dispatch(updateAircraftStatus(roundValues(data)));
        });
        // const interval = setInterval(() => {
        //     socket.emit("fe_request");
        // }, 100);
        return () => {
            socket.off("drone_update");
            // clearInterval(interval);
        };
    }, []);

    return (
        <InfoCard title="Drone (wip)">
            <PositionSection
                latitude={droneState.latitude}
                longitude={droneState.longitude}
                altitude={droneState.altitude}
                heading={droneState.heading}
            />
            <SpeedSection speed={droneState.speed} verticalSpeed={droneState.verticalSpeed} />
            <TimeStamp time={droneState.timestamp} />
            <MPSControlSection />
        </InfoCard>
    );
}

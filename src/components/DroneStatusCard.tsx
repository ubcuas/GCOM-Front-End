import { useAppSelector } from "../store/store";
import { selectAircraftStatus } from "../store/slices/dataSlice";
import InfoCard from "./InfoCard";
import PositionSection from "./DroneStatus/PositionSection";
import SpeedSection from "./DroneStatus/SpeedSection";
import TimeStamp from "./DroneStatus/TimeStamp";
import MPSControlSection from "./DroneStatus/MPSControlSection";
import { useEffect } from "react";
import { socket } from "../api/socket";

export default function DroneStatusCard() {
    const droneState = useAppSelector(selectAircraftStatus);

    useEffect(() => {
        socket.emit("telemetry_start");
        socket.on("telemetry_data", (data) => {
            console.log(data);
        });
        return () => {
            socket.emit("telemetry_stop");
            socket.off("telemetry_data");
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

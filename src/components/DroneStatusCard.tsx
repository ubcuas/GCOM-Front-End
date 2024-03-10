import { useAppSelector } from "../store/store";
import { selectAircraftStatus } from "../store/slices/dataSlice";
import InfoCard from "./InfoCard";
import PositionSection from "./DroneStatus/PositionSection";
import SpeedSection from "./DroneStatus/SpeedSection";
import TimeStamp from "./DroneStatus/TimeStamp";

export default function DroneStatusCard() {
    const droneState = useAppSelector(selectAircraftStatus);

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
        </InfoCard>
    );
}

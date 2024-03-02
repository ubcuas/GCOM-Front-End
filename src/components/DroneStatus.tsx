import { useAppSelector } from "../store/store";
import { selectAircraftStatus } from "../store/slices/dataSlice";
import InfoCard from "./InfoCard";
import PositionSection from "./InfoSections/PositionSection";
import SpeedSection from "./InfoSections/SpeedSection";
import TimeStamp from "./InfoSections/TimeStamp";

export default function DroneStatus() {
    const droneState = useAppSelector(selectAircraftStatus);

    return (
        <InfoCard title="Drone Status">
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

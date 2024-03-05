import InfoCard from "./InfoCard";
import { io } from "socket.io-client";

export default function WaypointStatus() {
    const socket = io("http://localhost:1323");
    socket.on("connect_error", (err: any) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);

        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);

        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
    });
    return <InfoCard title="Waypoint"></InfoCard>;
}

import { io } from "socket.io-client";

// TODO: Placeholder socket code for now. Implemetation in the future.

export const socket = io("http://localhost:8000", {
    autoConnect: false,
});

socket.on("connect_error", (error) => {
    console.log("Socket connection error", error);
});

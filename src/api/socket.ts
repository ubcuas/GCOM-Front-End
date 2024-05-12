import { io } from "socket.io-client";

export const socket = io("http://localhost:1323", {
    autoConnect: false,
});

socket.on("connect_error", (error) => {
    console.log("Socket connection error", error);
});

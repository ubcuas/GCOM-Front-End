import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1323/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers?
    },
});

export default api;

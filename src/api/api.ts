import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:1323/",
    headers: {
        "Content-Type": "application/jsSon",
        // Any other headers
    },
});

export default api;

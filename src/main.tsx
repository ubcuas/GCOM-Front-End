import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);

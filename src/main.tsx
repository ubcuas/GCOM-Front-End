import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

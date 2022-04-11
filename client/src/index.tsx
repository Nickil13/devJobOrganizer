import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import ApplicationProvider from "./context/applicationContext";

ReactDOM.render(
    <React.StrictMode>
        <ApplicationProvider>
            <App />
        </ApplicationProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

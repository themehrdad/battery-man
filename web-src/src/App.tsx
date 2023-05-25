import React from 'react';
import './App.css';
import {useQueryString} from "./hooks/useQueryString";
import Settings from "./pages/Settings";

function App() {
    const qs = useQueryString();

    switch (qs.page) {
        case "settings":
            return (
                <Settings />
            );
        default:
            return (
                <div className="App">
                    Unknown
                </div>
            );
    }
}

export default App;

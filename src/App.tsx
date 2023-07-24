import React from 'react';
import Routers from "./routes/Routers";
import {BrowserRouter} from "react-router-dom";
import {DataProvider} from "./contexts/DataContext";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
    return (
        <DataProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routers/>
                </BrowserRouter>
            </AuthProvider>
        </DataProvider>
    );
}

export default App;

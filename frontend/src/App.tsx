import React from 'react';
import './styles/App.css'
import CargoPage from "./components/pages/cargo/CargoPage";
import NavigationBar from "./components/NavigationBar";

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <CargoPage/>
        </div>
    );
}

export default App;

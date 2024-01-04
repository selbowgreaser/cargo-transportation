import React, {useState} from 'react';
import './styles/App.css'
import CargoPage from "./components/pages/cargo/CargoPage";
import NavigationBar from "./components/NavigationBar";

function App() {
    const [isCreateModalOpened, setIsCreateModalOpened] = useState(false)

    return (
        <div className="App">
            <NavigationBar
                setIsCreateModalOpened={setIsCreateModalOpened}
            />
            <CargoPage
                isCreateModalOpened={isCreateModalOpened}
                setIsCreateModalOpened={setIsCreateModalOpened}
            />
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import CargoPage from "./components/pages/cargo/CargoPage";
import NavigationBar from "./components/NavigationBar";
import SignInModal from "./components/pages/auth/SignInModal";
import AuthService from "./services/AuthService";
import {AuthContext} from "./context/AuthContext";
import AppRouter from "./components/AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(AuthService.isAuth())

    const [isCreateModalOpened, setIsCreateModalOpened] = useState(false)
    const [isSignInModalOpened, setIsSignInModalOpened] = useState(false)

    return (
        <div className="App">
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
            }}>
                <BrowserRouter>
                    <NavigationBar
                        setIsCreateModalOpened={setIsCreateModalOpened}
                        setIsSignInModalOpened={setIsSignInModalOpened}
                    />
                    <AppRouter
                        isCreateModalOpened={isCreateModalOpened}
                        setIsCreateModalOpened={setIsCreateModalOpened}
                        setIsSignInModalOpened={setIsSignInModalOpened}
                    />
                    <SignInModal
                        isVisible={isSignInModalOpened}
                        setIsVisible={setIsSignInModalOpened}
                    />
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;

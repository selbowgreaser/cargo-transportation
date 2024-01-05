import React, {useContext} from "react";
import {AuthContext, AuthContextContent} from "../context/AuthContext";
import {Navigate, Route, Routes} from "react-router-dom";
import CargoPage from "./pages/cargo/CargoPage";
import SingUpPage from "./pages/auth/SingUpPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

type AppRouterProps = {
    isCreateModalOpened: boolean;
    setIsCreateModalOpened: (isOpened: boolean) => void;
    setIsSignInModalOpened: (isOpened: boolean) => void;
}

const AppRouter: React.FC<AppRouterProps> = (
    {
        isCreateModalOpened,
        setIsCreateModalOpened,
        setIsSignInModalOpened,
    }) => {
    const {isAuth} = useContext(AuthContext) as AuthContextContent;

    return (
        isAuth
            ?
            <Routes>
                <Route
                    path={"/signup"}
                    element={<Navigate to={"/cargo"}/>}
                />
                <Route
                    path={"/"}
                    element={<Navigate to={"/cargo"}/>}
                />
                <Route
                    path={"/cargo"}
                    element={
                        <CargoPage
                            isCreateModalOpened={isCreateModalOpened}
                            setIsCreateModalOpened={setIsCreateModalOpened}
                        />
                    }
                />
                <Route
                    path={"*"}
                    element={<NotFoundPage/>}
                />
            </Routes>
            :
            <Routes>
                <Route
                    path={"/signup"}
                    element={
                        <SingUpPage
                            setIsSignInModalOpened={setIsSignInModalOpened}
                        />
                    }
                />
                <Route
                    path={"*"}
                    element={<Navigate to={"/signup"}/>}
                />
            </Routes>
    );
}

export default AppRouter;
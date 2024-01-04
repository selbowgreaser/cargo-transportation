import {createContext} from "react";

export interface AuthContextContent {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const AuthContext = createContext<AuthContextContent | null>(null);
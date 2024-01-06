import React, {useContext} from 'react';
import AuthService from "../services/AuthService";
import {AuthContext, AuthContextContent} from "../context/AuthContext";
import {Link, useLocation} from "react-router-dom";
import {pagesWithAvailableCreation} from "./AppRouter";

type NavigationBarProps = {
    setIsCreateModalOpened: (isOpened: boolean) => void;
    setIsSignInModalOpened: (isOpened: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = (
    {
        setIsCreateModalOpened,
        setIsSignInModalOpened,
    }) => {

    const {isAuth, setIsAuth} = useContext(AuthContext) as AuthContextContent;

    const location = useLocation();

    const logout = () => {
        AuthService.logout();
        setIsCreateModalOpened(false);
        setIsAuth(false);
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-[3000] bg-gray-800">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex justify-center sm:items-stretch sm:justify-start">
                        <div className="sm:ml-6 flex flex-row">
                            <div className="flex space-x-4 text-amber-50 font-black text-xl">
                                <div className="flex items-center">
                                    <p>Cargo Express</p>
                                </div>
                            </div>
                            {isAuth &&
                                <div className="ml-16 flex flex-row items-center text-gray-300 font-bold">
                                    <Link to={"/cargo"} className="flex flex-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                                        </svg>
                                        <div className="ml-2 flex items-center">
                                            Грузы
                                        </div>
                                    </Link>
                                    <Link to={"/posts"} className="ml-8 flex flex-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                                        </svg>

                                        <div className="ml-2 flex items-center">
                                            Посты
                                        </div>
                                    </Link>
                                    {pagesWithAvailableCreation.includes(location.pathname) &&
                                        <button
                                            type="button"
                                            onClick={() => setIsCreateModalOpened(true)}
                                            className="ml-8 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                                        >
                                            Создать
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    {isAuth
                        ?
                        <div className="flex flex-row text-gray-300 font-bold items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            <div className="mr-8 ml-2 font-bold">
                                {AuthService.username()}
                            </div>
                            <div onClick={logout} className="flex flex-row items-center cursor-pointer">
                                <div className="mr-2 font-bold">
                                    Выйти
                                </div>
                                <div className="mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2}
                                         stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mr-2">
                            <button
                                type="button"
                                onClick={() => setIsSignInModalOpened(true)}
                                className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-green-600 focus:outline-none focus:border-green-600"
                            >
                                Вход
                            </button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

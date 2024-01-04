import React, {useContext} from 'react';
import AuthService from "../services/AuthService";
import {AuthContext, AuthContextContent} from "../context/AuthContext";

type NavigationBarProps = {
    setIsCreateModalOpened: (isOpened: boolean) => void;
    setIsSignInModalOpened: (isOpened: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = (
    {
        setIsCreateModalOpened,
        setIsSignInModalOpened,
    }) => {

    const {isAuth, setIsAuth} = useContext(AuthContext) as AuthContextContent

    const logout = () => {
        AuthService.logout();
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
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpened(true)}
                                    className="ml-10 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                                >
                                    Создать
                                </button>
                            }
                        </div>
                    </div>
                    {isAuth
                        ?
                        <div className="mr-4" onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="text-gray-300 w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                            </svg>
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

import React from 'react';

type NavigationBarProps = {
    setIsCreateModalOpened: (isOpened: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({setIsCreateModalOpened}) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-800">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex justify-center sm:items-stretch sm:justify-start">
                        <div className="sm:ml-6 flex flex-row">
                            <div className="flex space-x-4 text-amber-50 font-black text-xl">
                                <div className="flex items-center">
                                    <p>Cargo Express</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpened(true)}
                                className="ml-10 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

import React from 'react';

const NavigationBar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4 text-amber-50 font-black text-xl">
                                <div>Cargo Express</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

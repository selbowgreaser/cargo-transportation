import React, {useEffect, useState} from 'react';

type SuccessToastProps = {
    message: string;
    show: boolean;
    onHide: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({message, show, onHide}) => {
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        if (show) {
            setAnimateOut(false);
            const timer = setTimeout(() => {
                setAnimateOut(true);
                setTimeout(() => {
                    onHide();
                }, 300);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [show, onHide]);

    const toastClasses = `!z-[1010] fixed bottom-4 right-4 flex items-center space-x-3 p-6 rounded-lg shadow-lg transition-opacity duration-300 bg-green-500 text-white text-lg ${animateOut ? 'opacity-0' : 'opacity-100'}`;

    return show ?
        <div className={toastClasses}>
            <span>{message}</span>
        </div>
        : null;
};

export default SuccessToast;
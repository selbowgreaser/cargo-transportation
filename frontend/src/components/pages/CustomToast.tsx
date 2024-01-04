import React, {useEffect, useState} from "react";

type CustomToastProps = {
    children: any;
    show: boolean;
    onHide: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({children, show, onHide}) => {
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

    const toastClasses = `!z-[1010] fixed bottom-4 right-4 flex items-center transition-opacity duration-300 text-white text-lg ${animateOut ? 'opacity-0' : 'opacity-100'}`;

    return show ?
        <div className={toastClasses}>
            {children}
        </div>
        : null;
}

export default CustomToast;
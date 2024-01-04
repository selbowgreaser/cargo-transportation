import React, {useContext, useState} from "react";
import CustomModal from "../../CustomModal";
import {SignInFormData} from "../../models/SignInFormData";
import {useRequest} from "../../../hooks/useRequest";
import AuthService from "../../../services/AuthService";
import {AuthContext, AuthContextContent} from "../../../context/AuthContext";

type SignInModalProps = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const SignInModal: React.FC<SignInModalProps> = (
    {
        isVisible,
        setIsVisible,
    }
) => {

    const defaultFormData = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState<SignInFormData>(defaultFormData);
    const [isSuccess, setIsSuccess] = useState(true);
    const {setIsAuth} = useContext(AuthContext) as AuthContextContent;

    const [signIn, isLoading, error] = useRequest(async (formData) => {
        const success = await AuthService.login(formData);

        setIsSuccess(success)

        if (success) {
            setIsAuth(true);
            handleClose();
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClose = () => {
        setFormData(defaultFormData)
        setIsVisible(false);
        setIsSuccess(true);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(formData);
    }

    return <CustomModal
        isVisible={isVisible}
        onClose={handleClose}
    >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[450px]">
            <div className="md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Вход
                </h1>
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Логин
                        </label>
                        <input
                            type="username"
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ryan_gosling_34rus"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Пароль
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {!isSuccess &&
                        <div className="text-red-500 text-sm">
                            Неверное имя пользователя или пароль
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full text-white font-bold bg-blue-600 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Войти
                    </button>
                </div>
            </div>
        </form>
    </CustomModal>
}

export default SignInModal;
import React, {useState} from "react";

type SignUpFormProps = {
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isPasswordsEqual: boolean;
    setIsSignInModalOpened: (isOpened: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (
    {
        handleSubmit,
        handleChange,
        isPasswordsEqual,
        setIsSignInModalOpened,
    }) => {

    return <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-1/4">
        <div className="md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Регистрация
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
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Подтверждение пароля
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                {!isPasswordsEqual &&
                    <div className="text-red-500 text-sm">
                        Пароли должны совпадать
                    </div>
                }
                <button
                    type="submit"
                    className="w-full mb-2 text-white font-bold bg-blue-600 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2 flex-row flex">
            Уже есть аккаунт?
            <div
                className="ml-1 font-medium cursor-pointer text-indigo-700 hover:underline dark:text-primary-500"
                onClick={() => setIsSignInModalOpened(true)}
            >
                Войти здесь
            </div>
        </p>
    </form>
}

export default SignUpForm;
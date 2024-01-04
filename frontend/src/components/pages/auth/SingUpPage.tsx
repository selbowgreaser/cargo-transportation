import React, {useContext, useEffect, useState} from "react";
import {SignUpFormData} from "../../models/SignUpFormData";
import {useRequest} from "../../../hooks/useRequest";
import SuccessToast from "../../SuccessToast";
import ErrorToast from "../../ErrorToast";
import AuthService from "../../../services/AuthService";
import {AuthContext, AuthContextContent} from "../../../context/AuthContext";
import SignUpForm from "./SignUpForm";

type SingUpPageProps = {
    setIsSignInModalOpened: (isOpened: boolean) => void;
}

const SingUpPage: React.FC<SingUpPageProps> = ({setIsSignInModalOpened}) => {

    const defaultFormData = {
        username: "",
        password: "",
        confirmPassword: ""
    }

    const [formData, setFormData] = useState<SignUpFormData>(defaultFormData);
    const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);

    const {setIsAuth} = useContext(AuthContext) as AuthContextContent

    const [isSuccessToast, setIsSuccessToast] = useState(false);
    const [isFailToast, setIsFailToast] = useState(false);

    const [signUp, isLoading, error] = useRequest(async (formData) => {
        setIsSuccessToast(false);

        await AuthService.register(formData)

        setIsAuth(true);
        setIsSuccessToast(true);
        setFormData(defaultFormData);
        setIsPasswordsEqual(true);
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword) {
            signUp(formData)
        } else {
            setIsPasswordsEqual(false);
        }
    }

    useEffect(() => {
        if (error) {
            setIsFailToast(true)
        }
    }, [error]);

    return <div>
        <div className="mt-24 flex items-center justify-center">
            <SignUpForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                isPasswordsEqual={isPasswordsEqual}
                setIsSignInModalOpened={setIsSignInModalOpened}
            />
        </div>
        <SuccessToast
            message="Регистрация успешно завершена"
            show={isSuccessToast}
            onHide={() => setIsSuccessToast(false)}
        />
        <ErrorToast
            message="Произошла ошибка при регистрации"
            show={isFailToast}
            onHide={() => setIsFailToast(false)}
        />
    </div>
}

export default SingUpPage;
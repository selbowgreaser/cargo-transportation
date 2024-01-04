import AuthApiClient from "../api/AuthApiClient";
import {SignUpFormData} from "../components/models/SignUpFormData";
import {SignInFormData} from "../components/models/SignInFormData";

export default class AuthService {

    static async register(formData: SignUpFormData) {
        const user = {
            username: formData.username,
            password: formData.password
        }

        await AuthApiClient.register(user);

        const response = await AuthApiClient.login(user)

        if (response["jwt-token"]) {
            localStorage.setItem("userAuth", `Bearer ${response["jwt-token"]}`);
        }
    }

    static async login(formData: SignInFormData) {
        const response = await AuthApiClient.login({
            username: formData.username,
            password: formData.password
        })

        if (response["jwt-token"]) {
            localStorage.setItem("userAuth", `Bearer ${response["jwt-token"]}`);
            return true
        }
        return false
    }

    static logout() {
        localStorage.removeItem("userAuth");
    }

    static isAuth() {
        return localStorage.getItem("userAuth") !== null
    }

    static authHeader() {
        return localStorage.getItem("userAuth")
    }
}
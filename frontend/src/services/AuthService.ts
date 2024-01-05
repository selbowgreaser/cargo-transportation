import AuthApiClient from "../api/AuthApiClient";
import {SignUpFormData} from "../components/models/SignUpFormData";
import {SignInFormData} from "../components/models/SignInFormData";

class LocalStorageKeys {

    static get userAuthHeaderKey() {
        return "cargo-express-user-auth";
    }

    static get usernameKey() {
        return "cargo-express-username";
    }
}

export default class AuthService {

    static async register(formData: SignUpFormData) {
        const user = {
            username: formData.username,
            password: formData.password
        }

        await AuthApiClient.register(user);

        const response = await AuthApiClient.login(user)

        if (response["jwt-token"]) {
            localStorage.setItem(LocalStorageKeys.userAuthHeaderKey, `Bearer ${response["jwt-token"]}`);
            localStorage.setItem(LocalStorageKeys.usernameKey, formData.username);
        }
    }

    static async login(formData: SignInFormData) {
        const response = await AuthApiClient.login({
            username: formData.username,
            password: formData.password
        })

        if (response["jwt-token"]) {
            localStorage.setItem(LocalStorageKeys.userAuthHeaderKey, `Bearer ${response["jwt-token"]}`);
            localStorage.setItem(LocalStorageKeys.usernameKey, formData.username);
            return true
        }
        return false
    }

    static username() {
        return localStorage.getItem(LocalStorageKeys.usernameKey);
    }

    static logout() {
        localStorage.removeItem(LocalStorageKeys.userAuthHeaderKey);
        localStorage.removeItem(LocalStorageKeys.usernameKey);
    }

    static isAuth() {
        return localStorage.getItem(LocalStorageKeys.userAuthHeaderKey) !== null
    }

    static authHeader() {
        return localStorage.getItem(LocalStorageKeys.userAuthHeaderKey)
    }
}
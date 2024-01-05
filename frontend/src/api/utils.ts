import AuthService from "../services/AuthService";

export const authRequestConfig = () => {
    return {
        headers: {
            Authorization: AuthService.authHeader()
        }
    }
}
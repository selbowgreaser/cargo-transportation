import axios from "axios";
import {User} from "./models/User";
import {UserAuth} from "./models/UserAuth";

export default class AuthApiClient {

    static async register(user: User): Promise<UserAuth> {
        console.log('POST /api/v0/signup');
        const response = await axios.post('http://localhost:8080/api/v0/signup', user);
        return response.data
    }

    static async login(user: User): Promise<UserAuth> {
        console.log('POST /api/v0/signin');
        const response = await axios.post('http://localhost:8080/api/v0/signin', user);
        return response.data
    }
}
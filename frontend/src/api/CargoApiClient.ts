import axios from "axios";
import {Cargo} from "./models/Cargo";

export default class CargoApiClient {

    static async findAllCargo(): Promise<Cargo[]> {
        console.log('GET /api/v0/cargo')
        const response = await axios.get('http://localhost:8080/api/v0/cargo');
        return response.data;
    }
}
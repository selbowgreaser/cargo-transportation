import axios from "axios";
import {Cargo} from "./models/Cargo";

export default class CargoApiClient {

    static async findAllCargo(): Promise<Cargo[]> {
        console.log('GET /api/v0/cargo');
        const response = await axios.get('http://localhost:8080/api/v0/cargo');
        return response.data;
    }

    static async updateCargo(cargo: Cargo) {
        console.log('PUT /api/v0/cargo');
        await axios.put('http://localhost:8080/api/v0/cargo', cargo);
    }

    static async deleteCargo(cargo: Cargo) {
        console.log('DELETE /api/v0/cargo');
        await axios.delete(`http://localhost:8080/api/v0/cargo/${cargo.id}`);
    }

    static async createCargo(cargo: Cargo) {
        console.log('POST /api/v0/cargo');
        const response = await axios.post('http://localhost:8080/api/v0/cargo', cargo);
        return response.data
    }
}
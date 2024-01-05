import axios from "axios";
import {Post} from "./models/Post";
import {authRequestConfig} from "./utils";

export default class PostApiClient {

    static async findAllPosts(): Promise<Post[]> {
        console.log('GET /api/v0/posts');
        const response = await axios.get('http://localhost:8080/api/v0/posts', authRequestConfig());
        return response.data;
    }
}
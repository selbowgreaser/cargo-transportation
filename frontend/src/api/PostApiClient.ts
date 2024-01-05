import axios from "axios";
import {Post} from "./models/Post";
import {authRequestConfig} from "./utils";
import {CreatePostRequestBody} from "./models/CreatePostRequestBody";

export default class PostApiClient {

    static async findAllPosts(): Promise<Post[]> {
        console.log('GET /api/v0/posts');
        const response = await axios.get('http://localhost:8080/api/v0/posts', authRequestConfig());
        return response.data;
    }

    static async createPost(post: CreatePostRequestBody): Promise<Post> {
        console.log('POST /api/v0/posts');
        const response = await axios.post('http://localhost:8080/api/v0/posts', post, authRequestConfig());
        return response.data
    }
}
import axios from "axios";
import {Post} from "./models/Post";
import {authRequestConfig} from "./utils";
import {CreatePostRequestBody} from "./models/CreatePostRequestBody";
import {UpdatePostRequestBody} from "./models/UpdatePostRequestBody";

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

    static async updatePost(post: UpdatePostRequestBody) {
        console.log('PUT /api/v0/posts');
        await axios.put('http://localhost:8080/api/v0/posts', post, authRequestConfig());
    }

    static async deletePost(post: Post) {
        console.log('DELETE /api/v0/posts');
        await axios.delete(`http://localhost:8080/api/v0/posts/${post.id}`, authRequestConfig());
    }
}
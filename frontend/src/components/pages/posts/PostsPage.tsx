import React, {useEffect, useState} from "react";
import PostItem from "./PostItem";
import {useRequest} from "../../../hooks/useRequest";
import {Post} from "../../../api/models/Post";
import PostApiClient from "../../../api/PostApiClient";
import PostCreateModal from "./PostCreateModal";

type PostsPageProps = {
    isCreateModalOpened: boolean;
    setIsCreateModalOpened: (isOpened: boolean) => void;
}

const PostsPage: React.FC<PostsPageProps> = (
    {
        isCreateModalOpened,
        setIsCreateModalOpened,
    }
) => {
    const [posts, setPosts] = useState<Post[]>([])

    const [fetchPosts, isFetching, error] = useRequest(async () => {
        const posts = await PostApiClient.findAllPosts();
        setPosts([...posts]);
    });

    const addPost = (post: Post) => {
        setPosts([...posts, post]);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return <section className="bg-white dark:bg-gray-900 my-24">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Посты Сообщества
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Здесь можно читать посты других пользователей или написать свой
                </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                {posts.length
                    ?
                    posts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            setPost={() => console.log("setPost")}
                            removePost={() => console.log("removePost")}
                        />
                    ))
                    :
                    <div/>
                }

            </div>
        </div>
        <PostCreateModal
            addPost={addPost}
            isVisible={isCreateModalOpened}
            setIsVisible={setIsCreateModalOpened}
        />
    </section>
}

export default PostsPage;
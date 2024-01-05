import React from "react";
import {Post} from "../../../api/models/Post";
import {formatISODateToLocalDate} from "../../../utils/DateUtils";

type PostItemProps = {
    post: Post;
    setPost: (post: Post) => void;
    removePost: (post: Post) => void;
}

const PostItem: React.FC<PostItemProps> = (
    {
        post,
    }
) => {
    return <article
        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
            <span className="text-sm">
                {formatISODateToLocalDate(post.createdAt)}
            </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <div>
                {post.header}
            </div>
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
            {post.body}
        </p>
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor" className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>

                <span className="font-medium dark:text-white">
                    {post.createdBy}
                </span>
            </div>
        </div>
    </article>
}

export default PostItem;
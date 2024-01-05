import React, {useState} from "react";
import {Post} from "../../../api/models/Post";
import {formatISODateToLocalDate} from "../../../utils/DateUtils";
import AuthService from "../../../services/AuthService";
import {Dropdown} from "flowbite-react";
import PostDeleteModal from "./PostDeleteModal";
import PostEditModal from "./PostEditModal";

type PostItemProps = {
    post: Post;
    setPost: (post: Post) => void;
    removePost: (post: Post) => void;
    isToastVisible: boolean;
    setIsToastVisible: (isVisible: boolean) => void;
}

const PostItem: React.FC<PostItemProps> = (
    {
        post,
        setPost,
        removePost,
        isToastVisible,
        setIsToastVisible,
    }
) => {
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

    const isAuthor = post.createdBy === AuthService.username()
    const hasActionsAccess = isAuthor || AuthService.isAdmin();

    return <article
        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
            <span className="text-sm">
                {formatISODateToLocalDate(post.createdAt)}
            </span>
            {hasActionsAccess &&
                <Dropdown
                    dismissOnClick={true}
                    label=""
                    renderTrigger={() =>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    }>
                    {isAuthor &&
                        <Dropdown.Item onClick={() => setIsEditModalOpened(true)}>
                            Изменить
                        </Dropdown.Item>
                    }
                    <Dropdown.Item onClick={() => setIsDeleteModalOpened(true)}>
                        Удалить
                    </Dropdown.Item>
                </Dropdown>
            }
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
        <PostEditModal
            post={post}
            setPost={setPost}
            isVisible={isEditModalOpened}
            setIsVisible={setIsEditModalOpened}
        />
        <PostDeleteModal
            post={post}
            removePost={removePost}
            isVisible={isDeleteModalOpened}
            setIsVisible={setIsDeleteModalOpened}
            isToastVisible={isToastVisible}
            setIsToastVisible={setIsToastVisible}
        />
    </article>
}

export default PostItem;
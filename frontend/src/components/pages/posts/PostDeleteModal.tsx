import React from "react";
import {useRequest} from "../../../hooks/useRequest";
import {Post} from "../../../api/models/Post";
import PostApiClient from "../../../api/PostApiClient";
import CustomModal from "../../CustomModal";
import CustomLoader from "../../CustomLoader";
import SuccessToast from "../../SuccessToast";

type DeletePostModalProps = {
    post: Post;
    removePost: (post: Post) => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    isToastVisible: boolean;
    setIsToastVisible: (isVisible: boolean) => void;
}

const PostDeleteModal: React.FC<DeletePostModalProps> = (
    {
        post,
        removePost,
        isVisible,
        setIsVisible,
        isToastVisible,
        setIsToastVisible,
    }
) => {

    const [deletePost, isDeleteLoading, error] = useRequest(async (post: Post) => {
        setIsToastVisible(false);
        await PostApiClient.deletePost(post);
        setIsToastVisible(true);
        removePost(post)
        setIsVisible(false)
    })

    const handleClose = () => {
        setIsVisible(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        deletePost(post);
    }

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div
                                    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title">Удаление поста</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Вы уверены, что хотите удалить пост "{post.header}"?
                                            Пост будет удален навсегда. Это действие не может быть
                                            отменено.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4 mb-4 mr-6 space-x-2">
                            <button
                                type="submit"
                                className="w-[100px] h-[40px] bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700"
                            >
                                {isDeleteLoading ?
                                    <CustomLoader/>
                                    :
                                    `Удалить`
                                }
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-[100px] h-[40px] bg-white hover:bg-gray-100 text-gray-700 text-sm font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </CustomModal>
        <SuccessToast
            message="Пост успешно удален"
            show={isToastVisible}
            onHide={() => setIsToastVisible(false)}
        />
    </div>
}

export default PostDeleteModal;
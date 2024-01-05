import React, {useEffect, useState} from "react";
import {Post} from "../../../api/models/Post";
import {useRequest} from "../../../hooks/useRequest";
import PostApiClient from "../../../api/PostApiClient";
import CustomModal from "../../CustomModal";
import CustomLoader from "../../CustomLoader";
import SuccessToast from "../../SuccessToast";
import ErrorToast from "../../ErrorToast";
import {EditPostFormData} from "../../models/EditPostFormData";

type PostEditModalProps = {
    post: Post;
    setPost: (post: Post) => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const PostEditModal: React.FC<PostEditModalProps> = (
    {
        post,
        setPost,
        isVisible,
        setIsVisible,
    }
) => {

    const getFormData = (post: Post): EditPostFormData => {
        return {
            id: post.id,
            header: post.header,
            body: post.body,
        }
    }

    const [formData, setFormData] = useState<EditPostFormData>(getFormData(post));
    const [isPostEdited, setIsPostEdited] = useState(false);
    const [isSuccessToast, setIsSuccessToast] = useState(false);
    const [isFailToast, setIsFailToast] = useState(false);

    const [updatePost, isPostUpdating, error] = useRequest(async (formData) => {
        setIsSuccessToast(false);
        await PostApiClient.updatePost(formData);
        setIsSuccessToast(true);
        setPost({...formData,
            createdBy: post.createdBy,
            createdAt: post.createdAt
        });
        handleClose();
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClose = () => {
        setFormData(getFormData(post));
        setIsVisible(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePost(formData);
    }

    useEffect(() => {
        const isEdited = (formData.header !== post.header) || (formData.body !== post.body)
        setIsPostEdited(isEdited)
    }, [formData]);

    useEffect(() => {
        if (error) {
            setIsFailToast(true)
            handleClose()
        }
    }, [error]);

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[700px]">
                <h2 className="text-xl font-bold mb-4">
                    Редактировать пост
                </h2>
                <p className="mb-6 text-gray-600">
                    Отредактируйте информацию о посте
                </p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Заголовок
                            </label>
                            <input
                                type="text"
                                name="header"
                                id="header"
                                value={formData.header}
                                onChange={handleChange}
                                className="appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                                placeholder="Как я стал программистом 3 месяца с нуля"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Содержимое
                            </label>
                            <textarea
                                id="body"
                                rows={6}
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                className="block py-2 px-3 w-full border text-sm rounded-lg text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                                placeholder="Напишите текст своего поста здесь..."
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-10 space-x-4">
                    <button
                        type="submit"
                        disabled={!isPostEdited}
                        className={`${isPostEdited ? "bg-blue-600 hover:opacity-90" : "bg-gray-300"} w-[140px] h-[50px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700`}
                    >
                        {isPostUpdating ?
                            <CustomLoader/>
                            :
                            `Сохранить`
                        }
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-[120px] h-[50px] bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </CustomModal>
        <SuccessToast
            message="Пост успешно изменен"
            show={isSuccessToast}
            onHide={() => setIsSuccessToast(false)}
        />
        <ErrorToast
            message="Произошла ошибка при изменении поста"
            show={isFailToast}
            onHide={() => setIsFailToast(false)}
        />
    </div>
}

export default PostEditModal;
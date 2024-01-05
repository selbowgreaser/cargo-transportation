import React, {useEffect, useState} from "react";
import CustomModal from "../../CustomModal";
import CustomLoader from "../../CustomLoader";
import SuccessToast from "../../SuccessToast";
import ErrorToast from "../../ErrorToast";
import {Post} from "../../../api/models/Post";
import {CreatePostFormData} from "../../models/CreatePostFormData";
import {useRequest} from "../../../hooks/useRequest";
import PostApiClient from "../../../api/PostApiClient";

type PostCreateModalProps = {
    addPost: (post: Post) => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const PostCreateModal: React.FC<PostCreateModalProps> = (
    {
        addPost,
        isVisible,
        setIsVisible,
    }) => {

    const defaultFormData: CreatePostFormData = {
        header: "",
        body: ""
    }

    const [formData, setFormData] = useState<CreatePostFormData>(defaultFormData);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isSuccessToast, setIsSuccessToast] = useState(false);
    const [isFailToast, setIsFailToast] = useState(false);

    const [createPost, isPostCreating, error] = useRequest(async (post) => {
        setIsSuccessToast(false);
        const newPost = await PostApiClient.createPost({
            header: formData.header,
            body: formData.body,
        });
        setIsSuccessToast(true);
        addPost(newPost);
        handleClose();
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClose = () => {
        setFormData(defaultFormData);
        setIsVisible(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost();
    }

    useEffect(() => {
        const isEmpty = (formData.header === '') || (formData.body === '')
        setIsFormFilled(!isEmpty)
    }, [formData])

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[700px]">
                <h2 className="text-xl font-bold mb-4">
                    Добавить пост
                </h2>
                <p className="mb-6 text-gray-600">
                    Заполните информацию о посте
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
                                rows={10}
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
                        disabled={!isFormFilled}
                        className={`${isFormFilled ? "bg-blue-600 hover:opacity-90" : "bg-gray-300"} w-[140px] h-[50px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700`}
                    >
                        {isPostCreating ?
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
            message="Пост успешно сохранен"
            show={isSuccessToast}
            onHide={() => setIsSuccessToast(false)}
        />
        <ErrorToast
            message="Произошла ошибка при добавлении поста"
            show={isFailToast}
            onHide={() => setIsFailToast(false)}
        />
    </div>
}

export default PostCreateModal;
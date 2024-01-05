import {Link} from "react-router-dom";

const   NotFoundPage = () => {
    return <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="text-gray-600">Запрашиваемая страница не найдена</p>
            <Link to="/"
               className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                Вернуться на главную
            </Link>
        </div>
    </div>
}

export default NotFoundPage;
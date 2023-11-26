import {useState} from "react";

type CallbackFunctionType = (...args: any[]) => any;

export const useRequest = (callback: CallbackFunctionType): [CallbackFunctionType, boolean, any] => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const makeRequest = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            let message = 'Unknown Error'
            if (e instanceof Error) {
                message = e.message
            }
            console.error('Error during request: ', message)
            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return [makeRequest, isLoading, error]
}

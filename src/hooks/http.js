import { useReducer, useCallback } from 'react';

const httpReducer = (currHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                indetifier: action.indetifier
            };
        case 'RESPONSE':
            return {
                ...currHttpState,
                loading: false,
                data: action.responseData,
                extra: action.extra
            };
        case 'ERROR':
            return { loading: false, error: action.errorMsg };
        case 'CLEAR':
            return { ...currHttpState, error: null }
        default:
            throw new Error('Should not be reached!')
    }

}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null,
        extra: null,
        indetifier: null
    });

    const sendRequest = useCallback((url, method, body, reqExtra, reqIndentifier) => {
        // 'https://react-hooks-practice-e3338.firebaseio.com/ingredients/${id}.json'
        dispatchHttp({ type: 'SEND', indetifier: reqIndentifier });
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(responseData => {
            dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra });
        }).catch(error => {
            // setError('Something went wrong');
            // setIsLoading(false)
            dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong' });
        });
    }, []);
    return {
        loading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIndentifier: httpState.indetifier
    };

};

export default useHttp;
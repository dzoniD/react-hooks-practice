import { useReducer,useCallback } from 'react';

const httpReducer = (currHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null,data: null };
        case 'RESPONSE':
            return { ...currHttpState, loading: false,data: action.responseData };
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
    });

    const sendRequest = useCallback((url,method,body) => {
        // 'https://react-hooks-practice-e3338.firebaseio.com/ingredients/${id}.json'
        dispatchHttp({type: 'SEND'});
        fetch(url, {
            method: method,
            body:body,
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(response => {
            return response.json()
          }).then(responseData => {
              dispatchHttp({type:'RESPONSE',responseData: responseData});
          }).catch(error => {
            // setError('Something went wrong');
            // setIsLoading(false)
            dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong'});
          });
        },[]);
    return {
        loading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest
    };
   
};

export default useHttp;
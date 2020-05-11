import React, {  useReducer, useCallback } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
}

const httpReducer = (currHttpState,action) => {
  switch(action.type){
    case 'SEND':
      return { loading: true, error: null};
    case 'RESPONSE':
      return { ...currHttpState,loading: false};
    case 'ERROR':
      return { loading: false, error: action.errorMsg};
    case 'CLEAR': 
      return { ...currHttpState,error: null}
    default:
        throw new Error('Should not be reached!')
  }

}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, {loading:false, error:null});
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients)
    dispatch(
      {
        type: 'SET',
        ingredients: filteredIngredients
      }
    );
  }, []);

  const addIngredientHandler = ingredient => {
    // setIsLoading(true);
    dispatchHttp({type: 'SEND'});
    fetch('https://react-hooks-practice-e3338.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'})
      return response.json()
    }).then(responseData => {
      // since we depend on the current state its best to use function form where we are guaranted to get our latest state
      // setUserIngredients(prevIngredients =>
      //   [
      //     ...prevIngredients,
      //     { id: responseData.name, ...ingredient }
      //   ]);
      dispatch(
        {
          type:'ADD',
          ingredient: {id: responseData.name, ...ingredient } 
        }
      )
    });

  }

  const removeIngredientHandler = (id) => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-practice-e3338.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'})
      // setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
      dispatch({ type: 'DELETE', id: id });
    }).catch(error => {
      // setError('Something went wrong');
      // setIsLoading(false)
      dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong'});
    })
  }

  const clearError = () => {
    // setError(null);
    dispatchHttp({ type: 'CLEAR'});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;

import React, { useState, useEffect,useCallback } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients)
  },[]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-practice-e3338.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(responseData => {
      // since we depend on the current state its best to use function form where we are guaranted to get our latest state
        setUserIngredients(prevIngredients =>
          [
            ...prevIngredients,
            { id: responseData.name, ...ingredient }
          ]);
      });

  }

  const removeIngredientHandler = (id) => {
    const filteredState = userIngredients.filter(ingredient => ingredient.id !== id);
    setUserIngredients(filteredState);
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;

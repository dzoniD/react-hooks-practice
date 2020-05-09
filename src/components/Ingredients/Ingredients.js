import React, { useState, useEffect } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect without second argument acts like componentDidUpdate,
  // useEffect with empty array ([]) as second argument acts like componentDidMount
  useEffect(() => {
    fetch('https://react-hooks-practice-e3338.firebaseio.com/ingredients.json').then(
      response => response.json()
    ).then(responseData => {
      const loadedIngredients = [];
      for( let key in responseData ){
        loadedIngredients.push({
          id:  key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      setUserIngredients(loadedIngredients);
    });
  }, [])

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
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;

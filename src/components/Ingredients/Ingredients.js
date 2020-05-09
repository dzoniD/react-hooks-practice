import React, { useState } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredients, setUserIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    // since we depend on the current state its best to use function form where we are guaranted to get our latest state
      setUserIngredients(prevIngredients => 
        [
          ...prevIngredients,
          { id: Math.random.toString(), ...ingredient }
        ]);
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;

import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  //Only use objects or arrays as values for your state if you really have data that changes together or when you need to change multiple things together.
  // You must use hooks in functional components or inside another custom hooks.
  //  You always have to use hooks on the root level of your component. You cant use hook in a nested functions, or in an if-else statement, or for loop.
    
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle, amount:enteredAmount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value)
              } }/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value)
              } }/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

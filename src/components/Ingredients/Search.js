import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter,setEnteredFilter] = useState('');

  
  // useEffect without second argument acts like componentDidUpdate,
  // useEffect with empty array ([]) as second argument acts like componentDidMount
  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-practice-e3338.firebaseio.com/ingredients.json' + query).then(
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
      onLoadIngredients(loadedIngredients);
    });
  },[enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;

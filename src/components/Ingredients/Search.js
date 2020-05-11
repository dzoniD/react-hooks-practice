import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter,setEnteredFilter] = useState('');
  const inputRef = useRef()

  
  // useEffect without second argument acts like componentDidUpdate,
  // useEffect with empty array ([]) as second argument acts like componentDidMount
  useEffect(() => {
    setTimeout(() => {
      // Closure! Bcuz of closure enteredFilter value here is the value user entered when we set this timer, not the value user entered after timer expired
      // so enteredFilter is the old value
      // inputRef is the current value entered
      if(enteredFilter === inputRef.current.value){
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
      }      
    }, 500);  
  },[enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;

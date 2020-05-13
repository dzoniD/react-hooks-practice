import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/http';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal'
import './Search.css';


const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter,setEnteredFilter] = useState('');
  const inputRef = useRef();
  const {loading, data, error, sendRequest, clear} = useHttp();

  
  // useEffect without second argument acts like componentDidUpdate,
  // useEffect with empty array ([]) as second argument acts like componentDidMount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Closure! Bcuz of closure enteredFilter value here is the value user entered when we set this timer, not the value user entered after timer expired
      // so enteredFilter is the old value
      // inputRef is the current value entered
      if(enteredFilter === inputRef.current.value){
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest('https://react-hooks-practice-e3338.firebaseio.com/ingredients.json' + query, 'GET');      
      }      
    }, 500);
    // useEffect can return function and only function aka clean up function. It is a function than will run right before the next time useEffect is run.
    // if we have empty array [] as second argument of useEffect the cleanup function runs when the component gets unmounted !!!
    return () => {
      clearTimeout(timer);
    }
  },[enteredFilter,sendRequest, inputRef]);

  useEffect(() => {
    if(!loading && !error && data){
      console.log(data);
      const loadedIngredients = [];
        for( let key in data ){
          loadedIngredients.push({
            id:  key,
            title: data[key].title,
            amount: data[key].amount
          });
        }
        onLoadIngredients(loadedIngredients);
    }
  },[data, loading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input ref={inputRef} value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;

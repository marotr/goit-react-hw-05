
 import css from './SearchBox.module.css';
import  { useState } from 'react';

const SearchBox = ({ value, submit }) => {
  const [searchQuery, setSearchQuery] = useState(value);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(searchQuery);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={css.input}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search movies"
      />
      <button  className = {css. button} type="submit">Search</button>
    </form>
  );
};

export default SearchBox;

import { useId } from 'react';
import css from './SearchBox.module.css';
import { toast } from 'react-toastify';


const SearchBox = ({ value, onChange, submit }) => {
  const searchBoxId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error('This field cannot be empty.');
      return;
    }
    submit(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      
          <input


          className={css.input}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          
          id={searchBoxId}
        />
        <button className = {css. button} type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBox;

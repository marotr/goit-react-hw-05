import { Suspense, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import css from './MoviesPages.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPages = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <main>
      
      <SearchBox value={query} onChange={setQuery} submit={handleSearchSubmit} />
      <MovieList query={query} />

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div><Loader /> Page is loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesPages;

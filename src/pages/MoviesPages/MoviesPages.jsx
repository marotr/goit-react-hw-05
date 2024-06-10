import { Suspense, useState } from 'react';
import {  Outlet } from 'react-router-dom';
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

      
      <Suspense fallback={<div><Loader /> Page is loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesPages;

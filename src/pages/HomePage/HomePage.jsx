import { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import css from './MoviesPages.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../components/api/movies-api';



const MoviesPages = () => {
  const [query, setQuery] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovies(query) ; 
        setTrendingMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [query]);

  return (
    <main>
      <SearchBox value={query} onChange={setQuery} submit={handleSearchSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList query={query} movies={trendingMovies} />
      )}
      
      <Suspense fallback={<div><Loader /> Page is loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesPages;

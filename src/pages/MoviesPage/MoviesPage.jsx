import { Suspense, useState, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../components/api/movies-api';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    if (!query) return;

    const fetchMoviesByQuery = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByQuery();
  }, [query]);

  return (
    <main>
      <SearchBox value={query} submit={handleSearchSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        query && <MovieList movies={movies} />
      )}

      <Suspense fallback={<div><Loader /> Page is loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesPage;

import { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../components/api/movies-api';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovies();
        setTrendingMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList movies={trendingMovies} />
      )}
      
      <Suspense fallback={<div><Loader /> Page is loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default HomePage;

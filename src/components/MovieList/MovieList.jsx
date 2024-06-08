import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movies-api';
import css from './MovieList.module.css';
import Loader from '../Loader/Loader';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies(query);
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMovies();
  }, [query]); // Add query to the dependency array

  if (loading) {
    return <div>Loading... <Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getPosterUrl = (path) =>
    `https://image.tmdb.org/t/p/w500${path}`;
  
  return (
    <div>
      <h1 className={css.header}>Trending Movies</h1>
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.poster_path && (
              <img className={css.poster} src={getPosterUrl(movie.poster_path)} alt={movie.title} />
            )}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

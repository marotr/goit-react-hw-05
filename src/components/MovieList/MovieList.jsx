import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/movies-api';
import css from './MovieList.module.css';
import Loader from '../Loader/Loader';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, [query]);

  if (loading) {
    return <div>Loading... <Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movies.length) {
    return <div>No movies found.</div>;
  }

  const getPosterUrl = (path) =>
    `https://image.tmdb.org/t/p/w500${path}`;

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <h1 className={css.header}>Trending Movies</h1>
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
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

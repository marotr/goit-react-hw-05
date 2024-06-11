import { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { fetchMovies } from '../api/movies-api';
import css from './MovieList.module.css';
import Loader from '../Loader/Loader';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

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



  return (
    <div>
      <h1 className={css.header}>Trending Movies</h1>
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.poster_path && (
                <img className={css.poster} src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              )}
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

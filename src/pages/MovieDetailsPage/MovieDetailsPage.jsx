import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchMovieById } from '../../components/api/movies-api';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading) {
    return <div>Loading... <Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      {movie && (
        <>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>{movie.popularity}</p>
            <ul>
              <li>
                <Link to="cast" state={{ from: location }}>Cast</Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: location }}>Reviews</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;

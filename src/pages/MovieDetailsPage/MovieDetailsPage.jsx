import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/api/movies-api';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';
import { BackLink } from '../../components/BackLink/BackLink';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';
 

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  if (loading) {
    return <div>Loading... <Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <main>
      <BackLink className={css.backArrow} to={backLinkHref}>Back to movies</BackLink>
      {movie && (
        <>
          <div className={css.wrapper}>
            <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div>
              <h2 className={css.title}>{movie.title}</h2>
              <p className={css.subtitle}>User score: <span className={css.subtitleInfo}>{movie.vote_average.toFixed(1)}</span></p>
              <p className={css.subtitle}>Overview: <span className={css.subtitleInfo}>{movie.overview}</span></p>
              <p className={css.subtitle}>Genres: <span className={css.subtitleInfo}>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </span></p>
            </div>
          </div>
          <nav>
            <ul className={css.menu}>
              <li>
                <NavLink to="cast" state={location.state} className={({ isActive }) => isActive ? css.active : css.menu__link}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" state={location.state} className={({ isActive }) => isActive ? css.active : css.menu__link}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;

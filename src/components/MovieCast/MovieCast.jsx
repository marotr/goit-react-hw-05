import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../../components/api/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MovieCast.module.css'

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const movieCast = await fetchMovieCredits(movieId);
        console.log("Fetched Cast:", movieCast);
        setCast(movieCast);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading... <Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map((member) => (
            <li  className={css.castCard} key={member.cast_id}>
              {member.profile_path && (
                <img className={css.castImg} src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
              )}
              <p className={css.castTitle}>{member.name} as {member.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default Cast;

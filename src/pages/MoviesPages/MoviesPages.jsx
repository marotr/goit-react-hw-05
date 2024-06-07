import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './MoviesPages.module.css'
import Loader from '../../components/Loader/Loader';

const MoviesPages = () => {
  return (
    <main>
      <h1 className={css.title}>Movies</h1>

      <ul>
        <li>
          <Link to = "cast">Cast</Link>
        </li>
        <li>
          <Link to = "reviews"> Reviews</Link>
        </li>
      </ul>
      <Suspense fallback = {<div> <Loader/>Page is loading...</div>}>
        <Outlet/>
      </Suspense>
    </main>
  )
}

export default MoviesPages
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { GiFilmProjector } from "react-icons/gi";

const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <header className={css.header}>
      <p className={css.logo}>
        <span className={css.icon}><GiFilmProjector /></span>
        FIND THE MOVIE TO WATCH
      </p>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>Home</NavLink>
        <NavLink to="/movies" className={buildLinkClass}>Movies</NavLink>
      </nav>
    </header>
  );
};

export default Navigation;

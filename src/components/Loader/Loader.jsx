import css from './Loader.module.css'
import RiseLoader from "react-spinners/BarLoader";

const Loader = () => {
  return (
    <div className={css.loaderContainer}><RiseLoader color="#1e748e" speedMultiplier='1'/></div>

  )
}

export default Loader
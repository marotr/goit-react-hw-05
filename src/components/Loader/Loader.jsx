import css from './Loader.module.css'
import RiseLoader from "react-spinners/BarLoader";

const Loader = () => {
  return (
    <div className={css.loaderContainer}><RiseLoader color="rgb(40, 18, 93) " speedMultiplier='1'/></div>

  )
}

export default Loader
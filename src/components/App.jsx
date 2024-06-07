import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from '../components/Navigation/Navigation'
import Loader from "./Loader/Loader";
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'


const HomePage = lazy(()=> import("../pages/HomePage/HomePage"));
const MoviesPages = lazy(()=> import('../pages/MoviesPages/MoviesPages'));
const MovieDetailsPage = lazy(()=> import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast  = lazy(()=> import('./MovieCast/MovieCast'));
const MovieReviews  = lazy(()=> import('./MovieReviews/MovieReviews'));


const App = () => {
  return (
    <>
      <Navigation/>
      
     
      <Suspense fallback = {<div> <Loader/>Page is loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<MoviesPages />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage/>} >
          <Route path = "cast" element = {<MovieCast/>}/>   
          <Route path = "reviews" element = {<MovieReviews/>}/>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </>
  );
};



export default App

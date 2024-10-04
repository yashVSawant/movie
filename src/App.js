import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import Loader from './components/Loader';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [movies , setMovies] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error ,setError] = useState(null);
  const [isRetry , setIsRetry] = useState(true);

  const fetchMoveHandler = async()=>{
    setMovies([])
    setIsLoading(true);
    setError(null);

    try {
      const filmsApiResponse = await fetch('https://swapi.dev/api/film');
      if(!filmsApiResponse.ok)throw new Error('Something went wrong!...Retrying');
      const fetchedMovies = await filmsApiResponse.json();
      const movies = fetchedMovies.results.map(movie=>{return{
        id:movie.episode_id,title:movie.title , releaseDate:movie.release_date ,openingText:movie.opening_crawl
      }});
      setMovies(movies)
      setIsLoading(false)
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      if(isRetry)retry()
    }
  }
  const retry = ()=>{
    setTimeout(() => {
      fetchMoveHandler()
    }, 5000);
  }

  const cancelRetryHandler = ()=>{
    setIsRetry(false);
    console.log(isRetry)
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoveHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList isLoading={isLoading} movies={movies} />}
        {!isLoading && movies.length ===0 && !error && <p>movies not fetched yet!</p>}
        {!isLoading && error && <p>{error} <Button onClick={cancelRetryHandler}>Cancel Retry</Button></p>}
        {isLoading && <Loader/>}
      </section>
    </React.Fragment>
  );
}

export default App;

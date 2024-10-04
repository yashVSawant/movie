import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [movies , setMovies] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
  const fetchMoveHandler = async()=>{
    setIsLoading(true)
    try {
      const filmsApiResponse = await fetch('https://swapi.dev/api/films/');
      const fetchedMovies = await filmsApiResponse.json()
      const movies = fetchedMovies.results.map(movie=>{return{
        id:movie.episode_id,title:movie.title , releaseDate:movie.release_date ,openingText:movie.opening_crawl
      }});
      setMovies(movies)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      isLoading(false)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoveHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList isLoading={isLoading} movies={movies} />}
        {!isLoading && <p>movies not fetched yet!</p>}
        {isLoading && <Loader/>}
      </section>
    </React.Fragment>
  );
}

export default App;

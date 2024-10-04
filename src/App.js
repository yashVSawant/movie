import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies , setMovies] = useState([]);
  const fetchMoveHandler = async()=>{
    try {
      const filmsApiResponse = await fetch('https://swapi.dev/api/films/');
      const fetchedMovies = await filmsApiResponse.json()
      const movies = fetchedMovies.results.map(movie=>{return{
        id:movie.episode_id,title:movie.title , releaseDate:movie.release_date ,openingText:movie.opening_crawl
      }});
      setMovies(movies)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoveHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

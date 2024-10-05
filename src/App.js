import React,{useState ,useEffect ,useCallback } from 'react';

import MoviesList from './components/MoviesList';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [movies , setMovies] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error ,setError] = useState(null);
  
  const fetchMoveHandler = useCallback(async()=>{
    setMovies([])
    setIsLoading(true);
    setError(null);
    try {
      const filmsApiResponse = await fetch('https://swapi.dev/api/films');
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
    }
  }
  ,[]);

  useEffect(()=>{  
    fetchMoveHandler();
  },[fetchMoveHandler])

  let listInfo ;
  if(isLoading) listInfo = <Loader/>;
  else if(error) listInfo = <p>{error}</p>;
  else if(movies.length > 0 )listInfo = <MoviesList isLoading={isLoading} movies={movies} />;
  else listInfo = <p>movies not fetched yet!</p>;



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoveHandler}>Fetch Movies</button>
      </section>
      <section>
        {listInfo}
      </section>
    </React.Fragment>
  );
}

export default App;

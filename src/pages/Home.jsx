// components imports
import Moviecard from "../components/Moviecard/Moviecard";

// CSS imports
import "./Home.css";
import useMovieList from "../hooks/useMovieList";

function Home() {

    const {movieList} = useMovieList("harry", "avengers", "superman");
    
    return (
        <>
            <div className="movie-card-wrapper">
                {movieList.length > 0 && movieList.map(movie => <Moviecard
                                            key={movie.imdbID}
                                            id={movie.imdbID}
                                            {...movie}
                                        />
                )}
            </div>
        </>
    );
}

export default Home;
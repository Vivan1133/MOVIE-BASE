import axios from "axios";
import { useParams } from "react-router-dom";
import { searchMovieById } from "../apis/omdb";
import { useEffect, useState } from "react";
import Moviecard from "../components/Moviecard/Moviecard";
import "./MovieDetails.css";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const {id} = useParams();
    async function downloadMovie() {
        const response = await axios.get(searchMovieById(id));
        // console.log(response.data);
        setMovie(response.data);
    }

    useEffect(() => {
        downloadMovie();
    }, [id]);

    return (
        <div className="movie-details-wrapper">
                {movie && 
                    <Moviecard 
                        Title={movie.Title} 
                        Year={movie.Year} 
                        Type={movie.Type} 
                        Poster={movie.Poster}
                        id={id}
                    />
                }
                {movie && 
                    <div className="movie-details">
                        <div>Plot: {movie.Plot}</div>
                        <div>Actors: {movie.Actors}</div>
                        <div>Genre: {movie.Genre.split(",").map((genre) => 
                            <span className="genre" id={genre}>{genre}</span>
                        )}</div>
                        <div>
                            <Rating items={10} value={Math.floor(movie.imdbRating)} />
                        </div>
                    </div>
                }
        </div>
    );
}

export default MovieDetails;
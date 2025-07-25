import axios from "axios";
import { searchMovie } from "../apis/omdb";
import { useEffect, useState } from "react";

function useMovieList(...args) {
    const [movieList, setMovieList] = useState([]);
    async function downloadDefaultMovies(...args) {
        try {
            const urls = args.map((name) => searchMovie(name));
            const response = await axios.all(urls.map(url => axios.get(url)));
            if(response[0].data.Error) {
                setMovieList([]);
            } else {
                const movies = response.map((movieResponse) => movieResponse.data.Search);
                setMovieList([].concat(...movies));
            }
        } catch (error) {
            console.log("okay");
        }
        
        // const response = await axios.get(searchMovie(movieName));
        // setMovieList([...movieList, response.data.Search]);
    }

    useEffect(() => {
        downloadDefaultMovies(...args);
    }, [...args]);

    return {movieList}
}

export default useMovieList;
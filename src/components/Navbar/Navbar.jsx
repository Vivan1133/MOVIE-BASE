import { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import useMovieList from "../../hooks/useMovieList"
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';

function Navbar() {

    const resultListRef = useRef(null);
    const[searchTerm, setSearchTerm] = useState("");
    const {movieList} = useMovieList(searchTerm);
    const navigate = useNavigate();

    const {theme, setTheme} = useContext(ThemeContext);

    function handleAutoCompleteClick(e, movieImdbId) {
        // console.log(e.target);
        navigate(`/movie/${movieImdbId}`)
    }

    function updateTheme() {
        if(theme == "dark") {
            setTheme("light");
            localStorage.setItem("app-theme", "light")
        } else {
            setTheme("dark");
            localStorage.setItem("app-theme", "dark");
        }
    }

    return (
        <div className="navbar-wrapper">
            <Link to={"/"} className='movie-base-title'><div>Movie Base</div></Link>
            <div className='search-bar'>
                <input
                    id="movie-search-input"
                    type="text" 
                    placeholder='What are you looking for?'
                    onFocus={() => {
                        resultListRef.current.style.display = "block";
                    }}
                    onBlur={() => {
                        resultListRef.current.style.display = "none";
                    }}
                    onChange={useDebounce((e) => {
                        setSearchTerm(e.target.value);
                    })}
                />
                <div id="result-list" ref={resultListRef}>
                    <div className="autocomplete-results">Auto complete results...</div>
                    {movieList.length > 0 && 
                        movieList.map((movie) => (
                            <div onMouseDown={(e) => handleAutoCompleteClick(e, movie.imdbID)} className="autocomplete-results" key={movie.imdbID}>
                                {movie.Title}
                            </div>
                        ))
                    }
                    
                </div>
            </div>          
            
            <div onClick={updateTheme}>
                <FontAwesomeIcon className="theme-icon" icon={(theme) == "dark" ? faSun : faMoon} />
            </div>
        </div>
    );
}

export default Navbar;
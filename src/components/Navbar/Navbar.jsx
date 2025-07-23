import { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useMovieList from '../../hooks/useMovieList';
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';

function Navbar() {
    const resultListRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { movieList } = useMovieList(searchTerm);
    const navigate = useNavigate();
    const { theme, setTheme } = useContext(ThemeContext);

    function handleAutoCompleteClick(e, movieImdbId) {
        navigate(`/movie/${movieImdbId}`);
    }

    function updateTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('app-theme', newTheme);
    }

    function highlightMatch(text, query) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <b key={index}>{part}</b>
            ) : (
                part
            )
        );
    }

    return (
        <div className="navbar-wrapper">
            <Link to="/" className="movie-base-title">
                <div>Movie Base</div>
            </Link>

            <div className="search-bar">
                <input
                    id="movie-search-input"
                    type="text"
                    placeholder="What are you looking for?"
                    onFocus={() => {
                        resultListRef.current.style.display = 'block';
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            if (resultListRef.current)
                                resultListRef.current.style.display = 'none';
                        }, 150);
                    }}
                    onChange={useDebounce((e) => {
                        setSearchTerm(e.target.value);
                    })}
                />
                <div id="result-list" ref={resultListRef}>
                    {movieList.length > 0 ? (
                        movieList.map((movie) => (
                            <div
                                onMouseDown={(e) => handleAutoCompleteClick(e, movie.imdbID)}
                                className="autocomplete-results"
                                key={movie.imdbID}
                            >
                                {highlightMatch(movie.Title, searchTerm)}
                            </div>
                        ))
                    ) : (
                        <div className="autocomplete-results">Start typing to search...</div>
                    )}
                </div>
            </div>

            <div onClick={updateTheme}>
                <FontAwesomeIcon
                    className="theme-icon"
                    icon={theme === 'dark' ? faSun : faMoon}
                />
            </div>
        </div>
    );
}

export default Navbar;

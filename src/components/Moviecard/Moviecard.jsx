import { useNavigate } from 'react-router-dom';
import './Moviecard.css';

function Moviecard({Title, Year, Type, Poster, id}) {

    const navigator = useNavigate();

    function handleClick() {
        navigator(`/movie/${id}`);
    }

    return (
        <div className="movie-wrapper" onClick={handleClick}>
            <div className="movie-image">
                <img src={Poster} alt="" />
            </div>
            <div className="movie-title">
                <span>{Title}</span>
            </div>
            <div className="movie-year">
                <span>Released in: {Year}</span>
            </div>
            <div className="movie-type">
                <span>Type: {Type}</span>
            </div>

        </div>
    );
}

export default Moviecard;
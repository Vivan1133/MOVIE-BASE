import {Routes, Route} from 'react-router-dom';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
}
export default MainRoutes;
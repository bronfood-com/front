import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Restaurants from './pages/Restaurants/Restaurants';
import Filter from './pages/Restaurants/Filter/Filter';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import YandexMap from './components/YandexMap/YandexMap';

function App() {
    return (
        <div>
            <Header />
            <YandexMap></YandexMap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
                <Route path="/logout" element={<ProtectedRoute component={<Logout />} />} />
                <Route path="/restaurants" element={<ProtectedRoute component={<Restaurants />} />}>
                    <Route path="/filter" element={<ProtectedRoute component={<Filter />} />} />
                </Route>
                <Route path={process.env.NODE_ENV === 'production' ? '/404' : '*'} element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;

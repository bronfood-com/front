import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Restaurants from './pages/Restaurants/Restaurants';
import Restaurant from './pages/Restaurants/Restaurant/Restaurant';
import './index.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import YandexMap from './components/YandexMap/YandexMap';
import { useCurrentUser } from './utils/hooks/useCurrentUser/useCurretUser';

function App() {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser();

    useEffect(() => {
        if (currentUser) {
            navigate('/restaurants');
        }
        // Navigate included in dependency array makes Restaurant component open for just 0.1 sec. when a restaurant card is clicked
        // and then close. Change of route apparently re-runs effect and redirects back to /restaurants.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
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
                    <Route path=":restaurantId" element={<ProtectedRoute component={<Restaurant />} />} />
                </Route>
                <Route path={process.env.NODE_ENV === 'production' ? '/404' : '*'} element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;

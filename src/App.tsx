import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Restaurants from './pages/Restaurants/Restaurants';
import Restaurant from './pages/Restaurants/Restaurant/Restaurant';
import Basket from './pages/Basket/Basket';
import './index.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import YandexMap from './components/YandexMap/YandexMap';
import { useCurrentUser } from './utils/hooks/useCurrentUser/useCurretUser';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import MealPage from './pages/MealPage/MealPage';

function App() {
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { currentUser } = useCurrentUser();
    useEffect(() => {
        if (currentUser && pathname === '/') {
            navigate('/restaurants');
        }
    }, [currentUser, navigate, pathname]);
    return (
        <div>
            <Header city={city} />
            <YandexMap setCity={setCity}></YandexMap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
                <Route path="/logout" element={<ProtectedRoute component={<Logout />} />} />
                <Route path="/restaurants" element={<ProtectedRoute component={<Restaurants />} />}>
                    <Route path=":restaurantId" element={<ProtectedRoute component={<Restaurant />} />}>
                        <Route path="meal/:mealId" element={<ProtectedRoute component={<MealPage />} />} />
                    </Route>
                </Route>
                <Route path="/restore-password" element={<RestorePassword />} />
                <Route path="/basket" element={<ProtectedRoute component={<Basket />} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    );
}

export default App;

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import YandexMap from './components/YandexMap/YandexMap';
import './index.scss';
import Basket from './pages/Basket/Basket';
import Logout from './pages/Logout/Logout';
import Main from './pages/Main/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import Restaurants from './pages/Restaurants/Restaurants';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { useCurrentUser } from './utils/hooks/useCurrentUser/useCurretUser';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import MealPage from './pages/MealPage/MealPage';
import AboutUs from './components/AboutUs/AboutUs';
import Feedback from './pages/Feedback/Feedback';
import Search from './pages/Search/Search';
import WaitingOrder from './pages/WaitingOrder/WaitingOrder/WaitingOrder';

function App() {
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { currentUser } = useCurrentUser();
    useEffect(() => {
        if (currentUser && pathname === '/') {
            navigate('/restaurants');
        }
    }, [currentUser, navigate, pathname])
    return (
        <div>
            <Header city={city} />
            <YandexMap setCity={setCity}></YandexMap>
            <Routes>
                <Route path="/waiting-order" element={<WaitingOrder />} />
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
                <Route path="/logout" element={<ProtectedRoute component={<Logout />} />} />
                <Route path="/restaurants" element={<Restaurants />}>
                    <Route path=":restaurantId" element={<MealPage />} >
                        <Route path="meal/:mealId" element={<MealPage />} />
                    </Route>
                </Route>
                <Route path="/restore-password" element={<RestorePassword />} />
                <Route path="/basket" element={<ProtectedRoute component={<Basket />} />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    );
}

export default App;

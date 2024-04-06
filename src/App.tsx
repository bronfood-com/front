import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import YandexMap from './components/YandexMap/YandexMap';
import './index.scss';
import Logout from './pages/Logout/Logout';
import Main from './pages/Main/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import Restaurant from './pages/Restaurants/Restaurant/Restaurant';
import Restaurants from './pages/Restaurants/Restaurants';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import WaitingConfirm from './pages/WaitingConfirm/WaitingConfirm';
import { useCurrentUser } from './utils/hooks/useCurrentUser/useCurretUser';
import PopupOrderCancelled from './pages/PopupOrderCancelled/PopupOrderCancelled';

function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { currentUser } = useCurrentUser();
    useEffect(() => {
        // Enable redirect to /restaurants in PR preview
        const regex = /\/pr-preview\/pr-\d\d\//i;
        if (currentUser && (regex.test(pathname) || pathname === '/')) {
            navigate('/restaurants');
        }
    }, [currentUser, navigate, pathname]);
    return (
        <div>
            <Header />
            <YandexMap />
            <Routes>
                <Route path="/popup-order-cancelled" element={<PopupOrderCancelled />} />
                <Route path="/waiting-confirm" element={<WaitingConfirm clientId="clientId1" />} />
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

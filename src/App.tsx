import Header from './components/Header/Header';
import PasswordSaved from './pages/PasswordSaved/PasswordSaved';
import PopupFeedbackThanks from './pages/PopupFeedbackThanks/PopupFeedbackThanks';
import PopupSignupSuccess from './pages/PopupSignupSuccess/PopupSignupSuccess';
import NewPassword from './pages/NewPassword/NewPassword';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import YandexMap from './components/YandexMap/YandexMap';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
    const { currentUser } = useCurrentUser();

    return (
        <div>
            <Header isLogin={!!currentUser} />
            <YandexMap></YandexMap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/recovery_pass" element={<PasswordRecovery />} />
                <Route path="/signup_done" element={<PopupSignupSuccess />} />
                <Route path="/new_pass" element={<NewPassword />} />
                <Route path="/password_done" element={<PasswordSaved />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} islogin={!!currentUser} />} />
                <Route path="/feedback_done" element={<ProtectedRoute component={<PopupFeedbackThanks />} islogin={!!currentUser} />} />
            </Routes>
        </div>
    );
}

export default App;

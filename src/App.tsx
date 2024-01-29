import { useState } from 'react';
import Header from './components/Header/Header';
import PasswordSaved from './pages/PasswordSaved/PasswordSaved';
import PopupFeedbackThanks from './pages/PopupFeedbackThanks/PopupFeedbackThanks';
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

function App() {
    const [isLogin] = useState(false);

    return (
        <div>
            <Header isLogin={isLogin} />
            <YandexMap></YandexMap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/recovery_pass" element={<PasswordRecovery />} />
                <Route path="/new_pass" element={<NewPassword />} />
                <Route path="/password_done" element={<PasswordSaved />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} islogin={isLogin} />} />
                <Route path="/feedback_done" element={<ProtectedRoute component={<PopupFeedbackThanks />} islogin={isLogin} />} />
            </Routes>
        </div>
    );
}

export default App;

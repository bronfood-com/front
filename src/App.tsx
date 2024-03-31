import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import YandexMap from './components/YandexMap/YandexMap';
import WaitingConfirmOrderModal from './components/WaitingConfirmOrderModal/WaitingConfirmOrderModal';
import WaitingOrderModal from './components/WaitingOrderModal/WaitingOrderModal';
import ConfirmationPopup from './components/Popups/ConfirmationPopup/ConfirmationPopup';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <YandexMap />
            <Routes>
                <Route path='/confirm-cancelling' element={
                    <ConfirmationPopup
                        title='Вы уверены, что хотите отменить заказ?'
                        confirmButtonText='Да'
                        onCancel={() => navigate('/waiting-order')}
                        onSubmit={function (): void {
                            throw new Error('функция сабмита не реализована, но нужно отправить запрос на сервер через Redux');
                        }}
                        children={undefined}
                        />
                }
                />
                <Route path='/waiting-confirm-order' element={<WaitingConfirmOrderModal />} />
                <Route path='/waiting-order' element={<WaitingOrderModal onCancelOrder={() => console.log('cancel order')}/>} />
                <Route path="/" element={<Main />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
                <Route path="/logout" element={<ProtectedRoute component={<Logout />} />} />
                <Route path={process.env.NODE_ENV === 'production' ? '/404' : '*'} element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;

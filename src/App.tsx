import PasswordSaved from './components/Popups/InfoPopup/PasswordSaved/PasswordSaved';
import PopupSignupSuccess from './components/Popups/InfoPopup/PopupSignupSuccess/PopupSignupSuccess';
import SignUp from './components/Popups/WithForm/SignUp/SignUp';
import './index.scss';

function App() {
    return (
        <>
            <div>HOME</div>
            <SignUp />
            <PopupSignupSuccess />
            <PasswordSaved />
        </>
    );
}

export default App;

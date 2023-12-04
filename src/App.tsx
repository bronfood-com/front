import PasswordSaved from './components/Popups/InfoPopup/PasswordSaved/PasswordSaved';
import PopupSignupSuccess from './components/Popups/InfoPopup/PopupSignupSuccess/PopupSignupSuccess';
import SignIn from './components/Popups/WithForm/SignIn/SignIn';
import SignUp from './components/Popups/WithForm/SignUp/SignUp';
import './index.scss';

function App() {
    return (
        <>
            <div>HOME</div>
            <SignIn/>
            <SignUp />
            <PopupSignupSuccess />
            <PasswordSaved />
        </>
    );
}

export default App;

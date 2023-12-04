import Popup from '../../Popup/Popup';
import InfoImage from '../../../InfoImage/InfoImage';
import styles from "./PopupSignupSuccess.module.scss";

const PopupSignupSuccess = () => {
    return (
        <Popup mode="info" >
            <h2 className={styles.popup__title}>Спасибо за регистрацию!</h2>
            <InfoImage mode="red_tube" />
        </Popup>
    );
};

export default PopupSignupSuccess;



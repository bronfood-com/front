import Popup from '../../Popup/Popup';
import InfoImage from '../../../InfoImage/InfoImage';
import styles from './PopupFeedbackThanx.module.scss';

const PopupFeedbackThanx = () => {
    return (
        <Popup mode="feedback-thanx">
            <InfoImage mode="stars_tube" />
            <h2 className={styles.popup__title}>Спасибо за отзыв!</h2>
        </Popup>
    );
};

export default PopupFeedbackThanx;

import Popup from '../../Popup/Popup';
import InfoImage from '../../../InfoImage/InfoImage';
import styles from './PopupFeedbackThanks.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PopupFeedbackThanks = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup>
            <div className={styles.feedback__thanks}>
                <InfoImage mode="stars_tube" />
                <h2 className={styles.feedback__title}>Спасибо за отзыв!</h2>
            </div>
        </Popup>
    );
};

export default PopupFeedbackThanks;

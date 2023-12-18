import Popup from '../../Popup/Popup';
import InfoImage from '../../../InfoImage/InfoImage';
import styles from './PopupSignupSuccess.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PopupSignupSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup mode="info">
            <h2 className={styles.popup__title}>Спасибо за регистрацию!</h2>
            <InfoImage mode="red_tube" />
        </Popup>
    );
};

export default PopupSignupSuccess;

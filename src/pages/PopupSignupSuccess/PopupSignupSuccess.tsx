import Popup from '../../components/Popups/Popup/Popup';
import InfoImage from '../../components/InfoImage/InfoImage';
import styles from './PopupSignupSuccess.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PopupSignupSuccess = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup mode="info">
            <h2 className={styles.popup__title}>{t('popupSignupSuccess.title')}</h2>
            <InfoImage mode="red_tube" />
        </Popup>
    );
};

export default PopupSignupSuccess;

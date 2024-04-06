import Popup from '../../components/Popups/Popup/Popup';
import styles from './PopupOrderCancelled.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg'

const PopupOrderCancelled = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 5000);
    }, [navigate]);
    return (
        <Popup onClose={() => navigate('/')}>
            <div className={styles.popupOrderCancelled}>
                <h2 className={styles.popupOrderCancelled__title}>{t('pages.popupOrderCancelled.yourOrderHasBeeCancelled')}</h2>
                <p className={styles.popupOrderCancelled__description}>{t('pages.popupOrderCancelled.youWillReceiveYourMoneyBackWithin15Minutes')}</p>
                <img className={styles.popupOrderCancelled__image} src={waitingImg} alt='waiting image'/>
            </div>
        </Popup>
    );
};

export default PopupOrderCancelled;

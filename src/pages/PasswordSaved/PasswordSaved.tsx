import { useNavigate } from 'react-router-dom';
import InfoImage from '../../components/InfoImage/InfoImage';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './PasswordSaved.module.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordSaved = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup mode="info">
            <div className={styles.block}>
                <div className={styles.block__success}></div>
                <p className={styles.block__text}>{t('pages.passwordSaved.title')}</p>
                <InfoImage mode="red_tube"></InfoImage>
            </div>
        </Popup>
    );
};

export default PasswordSaved;

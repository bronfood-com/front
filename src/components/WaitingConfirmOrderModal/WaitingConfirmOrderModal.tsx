import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import styles from './WaitingConfirmOrderModal.module.scss';

const WaitingConfirmOrderModal: FC = () => {
    const waitingTime = 2;
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/waiting-order');
        }, 2 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.waitingConfirmOrderModal}>
            <h2 className={styles.waitingConfirmOrderModal__title}>{t('components.waitingConfirmModal.title')}</h2>
            <p className={styles.waitingConfirmOrderModal__subtitle}>{t('components.waitingConfirmModal.subtitle')}</p>
            <img src={waitingImg} alt="waiting image" className={styles.waitingConfirmOrderModal__img} />
            <ProgressBar estimatedTime={waitingTime} />
            <p className={styles.waitingConfirmOrderModal__subtitleNote}>{t('components.waitingConfirmModal.subtitleNote')}</p>
        </div>
    );
};

export default WaitingConfirmOrderModal;

import { FC } from 'react';
import styles from './WaitingStatusModal.module.scss';
import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';

const WaitingStatusModal: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.statusModal}>
            <h2 className={styles.statusModal__title}>{t('components.waitingStatusModal.title')}</h2>
            <p className={styles.statusModal__subtitle}>{t('components.waitingStatusModal.subtitle')}</p>
            <img src={waitingImg} alt="waiting image" className={styles.statusModal__img} />
            <ProgressBar duration={120000} />
            <p className={styles.statusModal__subtitleNote}>{t('components.waitingStatusModal.subtitleNote')}</p>
        </div>
    );
};

export default WaitingStatusModal;

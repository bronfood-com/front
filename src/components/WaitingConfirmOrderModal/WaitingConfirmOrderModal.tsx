import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import styles from './WaitingConfirmOrderModal.module.scss';
import { useDispatch } from 'react-redux';
import { setEstimatedTime, setStartTime } from '../../services/slices/progressBarSlice';

const WaitingConfirmOrderModal: FC = () => {
    const waitingTime = 3; // Время ожидания в минутах !
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const now = new Date().getTime();
        const startTime = now; // Установка текущего времени как начального
        const estimatedTime = waitingTime; // Установка ожидаемого времени в минутах

        dispatch(setStartTime(startTime));
        dispatch(setEstimatedTime(estimatedTime));

        const timer = setTimeout(() => {
            navigate('/waiting-order');
        }, waitingTime * 60 * 1000);

        return () => {
            clearTimeout(timer);
            // Здесь не очищаю состояние через dispatch(setEstimatedTime(0)), так как нужно будет
            // делать это по запросу и ответу апишки
        };
    }, [dispatch, navigate, waitingTime]);

    return (
        <div className={styles.waitingConfirmOrderModal}>
            <h2 className={styles.waitingConfirmOrderModal__title}>{t('components.waitingConfirmModal.title')}</h2>
            <p className={styles.waitingConfirmOrderModal__subtitle}>{t('components.waitingConfirmModal.subtitle')}</p>
            <img src={waitingImg} alt="waiting image" className={styles.waitingConfirmOrderModal__img} />
            <span className={styles.waitingConfirmOrderModal__separator} />
            <ProgressBar />
            <p className={styles.waitingConfirmOrderModal__subtitleNote}>{t('components.waitingConfirmModal.subtitleNote')}</p>
        </div>
    );
};

export default WaitingConfirmOrderModal;

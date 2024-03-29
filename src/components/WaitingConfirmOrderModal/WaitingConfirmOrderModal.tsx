import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import styles from './WaitingConfirmOrderModal.module.scss';
import { useDispatch } from 'react-redux';
import { setEstimatedTime } from '../../services/slices/progressBarSlice';

const WaitingConfirmOrderModal: FC = () => {
    const waitingTime = 2;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setEstimatedTime(waitingTime));

        const timer = setTimeout(() => {
            navigate('/waiting-order');
        }, waitingTime * 60 * 1000);

        return () => {
            clearTimeout(timer);
            dispatch(setEstimatedTime(0));
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

import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import { resetEstimatedTime, resetStartTime, setEstimatedTime, setStartTime } from '../../services/slices/progressBarSlice';
import { AppDispatch } from '../../services/store';
import { confirmOrderThunk } from '../../services/thunks/сonfirmOrderThunk';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import styles from './WaitingConfirmOrderModal.module.scss';

const WaitingConfirmOrderModal: FC = () => {
    const waitingTime = 3;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setStartTime(new Date().getTime()));
        dispatch(setEstimatedTime(waitingTime));

        const confirmPromise = dispatch(confirmOrderThunk()).unwrap();

        const timeoutId = setTimeout(() => {
            confirmPromise.then(() => {
            }).catch(() => {
                alert(t('components.waitingConfirmModal.timeoutMessage'));
            });
        }, waitingTime * 60 * 1000);

        confirmPromise.then(() => {
            dispatch(resetStartTime());
            dispatch(resetEstimatedTime());

            clearTimeout(timeoutId);
            navigate('/waiting-order');
        }).catch(() => {
            alert(t('components.waitingConfirmModal.errorMessage'));
        });

        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch, navigate, t, waitingTime]);

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

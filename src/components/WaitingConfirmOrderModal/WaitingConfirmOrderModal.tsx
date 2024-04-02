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

        confirmPromise.then(() => {
            navigate('/waiting-order');
        }).catch(() => {
            alert(t('components.waitingConfirmModal.anErrorOccurredWhileConfirmingTheOrderPleaseTryAgain'));
        });

        const timeoutId = setTimeout(() => {
            alert(t('components.waitingConfirmModal.theWaitingTimeHasExpiredPleaseTryAgain'));
        }, waitingTime * 60 * 1000);

        return () => {
            clearTimeout(timeoutId);
            dispatch(resetStartTime());
            dispatch(resetEstimatedTime());
        };
    }, [dispatch, navigate, t, waitingTime]);

    return (
        <div className={styles.waitingConfirmOrderModal}>
            <h2 className={styles.waitingConfirmOrderModal__title}>{t('components.waitingConfirmModal.pleaseWaitForTheOrderConfirmation')}</h2>
            <p className={styles.waitingConfirmOrderModal__subtitle}>{t('components.waitingConfirmModal.preparationWillBeginUponConfirmation')}</p>
            <img src={waitingImg} alt="waiting image" className={styles.waitingConfirmOrderModal__img} />
            <span className={styles.waitingConfirmOrderModal__separator} />
            <ProgressBar />
            <p className={styles.waitingConfirmOrderModal__subtitleNote}>{t('components.waitingConfirmModal.pleaseWaitForTheOrderCode')}</p>
        </div>
    );
};

export default WaitingConfirmOrderModal;

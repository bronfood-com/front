import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './WaitingOrderModal.module.scss';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import mockData from '../../utils/serverMocks/orderMock.json';
import { RootState } from '../../services/store';
import { setStartTime, setEstimatedTime } from '../../services/slices/progressBarSlice';
import { setRemainingCancellationTime } from '../../services/slices/cancellationTimeSlice';

type WaitingOrderModalProps = {
    onCancelOrder: () => void;
};

const WaitingOrderModal: FC<WaitingOrderModalProps> = ({ onCancelOrder }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialEstimatedTime = 20 * 60; // время ожидания заказа (20 умножаю на секунды)
    const initialCancellationTime = 3 * 60; // время для отмены (3 умножаю на секунды)

    const startTime = useSelector((state: RootState) => state.progressBar.startTime);
    const estimatedTime = useSelector((state: RootState) => state.progressBar.estimatedTime);
    const remainingCancellationTime = useSelector((state: RootState) => state.cancellationTime.remainingCancellationTime);

    const [remainingOrderTime, setRemainingOrderTime] = useState(estimatedTime);

    useEffect(() => {
        if (!startTime) {
            const now = Date.now();
            dispatch(setStartTime(now));
            dispatch(setEstimatedTime(initialEstimatedTime));
            dispatch(setRemainingCancellationTime(initialCancellationTime));
        }

        const timerInterval = setInterval(() => {
            const now = Date.now();
            const elapsedTimeInSeconds = Math.floor((now - startTime) / 1000);

            const newRemainingOrderTime = estimatedTime - elapsedTimeInSeconds;
            dispatch(setRemainingCancellationTime(Math.max(initialCancellationTime - elapsedTimeInSeconds, 0))); // Обновление времени до отмены в Redux

            setRemainingOrderTime(newRemainingOrderTime);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [dispatch, startTime, estimatedTime, initialCancellationTime]);

    const formatTime = (timeInSeconds: number) => {
        const sign = timeInSeconds < 0 ? "-" : "";
        const absTimeInSeconds = Math.abs(timeInSeconds);
        const minutes = Math.floor(absTimeInSeconds / 60);
        const seconds = absTimeInSeconds % 60;
        return `${sign}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCancelOrder = () => {
        onCancelOrder();
        navigate('/confirm-cancelling', { replace: true });
    };

    return (
        <div className={styles.waitingOrderModal}>
            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.title')}</h2>
            <h1 className={styles.waitingOrderModal__promocode}>{t('components.waitingOrderModal.promoCode')}</h1>
            <OrderTimeCounter remainingTime={remainingOrderTime} />
            <div className={styles.waitingOrderModal__separator}>
                <OrderListArticle order={mockData} />
            </div>
            {remainingCancellationTime > 0 && (
                <>
                    <p className={styles.waitingOrderModal__subtitleNote}>
                        {t('components.waitingOrderModal.subtitleNote')}
                        <span className={styles.waitingOrderModal__subtitleNote_orange}>
                            {formatTime(remainingCancellationTime)}{t('components.waitingOrderModal.minutes')}
                        </span>
                    </p>
                    <button
                        className={styles.waitingOrderModal__button}
                        type='button'
                        onClick={handleCancelOrder}
                    >
                        {t('components.waitingOrderModal.buttonTitle')}
                    </button>
                </>
            )}
        </div>
    );
};

export default WaitingOrderModal;

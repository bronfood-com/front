import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRemainingCancellationTime } from '../../services/slices/cancellationTimeSlice';
import { setEstimatedTime, setStartTime } from '../../services/slices/progressBarSlice';
import { AppDispatch, RootState } from '../../services/store';
import { confirmOrder } from '../../services/thunks/confirmOrderThunk';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import styles from './WaitingOrderModal.module.scss';

type WaitingOrderModalProps = {
    onCancelOrder: () => void;
};

const WaitingOrderModal: FC<WaitingOrderModalProps> = ({ onCancelOrder }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const initialEstimatedTime = 20 * 60; // время ожидания заказа (20 умножаю на секунды)
    const initialCancellationTime = 3 * 60; // время для отмены (3 умножаю на секунды)

    const startTime = useSelector((state: RootState) => state.progressBar.startTime);
    const estimatedTime = useSelector((state: RootState) => state.progressBar.estimatedTime);
    const remainingCancellationTime = useSelector((state: RootState) => state.cancellationTime.remainingCancellationTime);
    const orderDetails = useSelector((state: RootState) => state.order.orderData);
    const isLoading = useSelector((state: RootState) => state.order.loading);
    const error = useSelector((state: RootState) => state.order.error);

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
            dispatch(setRemainingCancellationTime(Math.max(initialCancellationTime - elapsedTimeInSeconds, 0)));

            setRemainingOrderTime(newRemainingOrderTime);
        }, 1000);

        dispatch(confirmOrder());

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
            {isLoading ? (
                <p>Тут скоро будет прелоадер... <br/>
                    ... который оповещает о загрузке деталей заказа<br/>
                    а сейчас это двухсекудная имитация загрузки заказа
                </p>
            ) : error ? (
                <p>А тут будет ошибка загрузки деталей заказа с сервера: {error}</p>
            ) : (
                <>
                    {orderDetails && (
                        <>
                            <h1 className={styles.waitingOrderModal__orderCode}>{orderDetails.orderCode}</h1>
                            <OrderTimeCounter remainingTime={remainingOrderTime} />
                            <div className={styles.waitingOrderModal__separator}>
                                <OrderListArticle order={orderDetails} />
                            </div>
                        </>
                    )}
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
                </>
            )}
        </div>
    );
};

export default WaitingOrderModal;

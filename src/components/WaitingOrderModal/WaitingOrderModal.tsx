import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectOrderData, selectOrderError, selectOrderLoading } from '../../services/selectors/orderSelectors';
import { selectEstimatedTime, selectStartTime } from '../../services/selectors/progressBarSelectors';
import { selectRemainingCancellationTime } from '../../services/selectors/remainingCancellationTimeSelector';
import { setRemainingCancellationTime } from '../../services/slices/cancellationTimeSlice';
import { setEstimatedTime, setStartTime } from '../../services/slices/progressBarSlice';
import { AppDispatch } from '../../services/store';
import { confirmOrderThunk } from '../../services/thunks/сonfirmOrderThunk';
import { formatTime } from '../../utils/serviceFuncs/formatTime';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import styles from './WaitingOrderModal.module.scss';

const WaitingOrderModal: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const initialEstimatedTime = 20 * 60; // время ожидания заказа (20 умножаю на секунды)
    const initialCancellationTime = 3 * 60; // время для отмены (3 умножаю на секунды)

    const startTime = useSelector(selectStartTime);
    const estimatedTime = useSelector(selectEstimatedTime);
    const remainingCancellationTime = useSelector(selectRemainingCancellationTime);
    const orderDetails = useSelector(selectOrderData);
    const isLoading = useSelector(selectOrderLoading);
    const error = useSelector(selectOrderError);

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

        dispatch(confirmOrderThunk());

        return () => clearInterval(timerInterval);
    }, [dispatch, startTime, estimatedTime, initialCancellationTime, initialEstimatedTime]);

    const handleCancelOrder = () => {
        navigate('/confirm-cancelling', { replace: true });
    };

    return (
        <div className={styles.waitingOrderModal}>
            {isLoading ? (
                <p>Soon will be preloader here... by the way here is fake 2 sec delay imitation</p>
            ) : error ? (
                <p>And here willbe error message about the order: {error}</p>
            ) : (
                <>
                    {orderDetails && (
                        <>
                            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.orderCode')}</h2>
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
                                {t('components.waitingOrderModal.youCanCancelTheOrderWithin')}
                                <span className={styles.waitingOrderModal__subtitleNote_orange}>
                                    {formatTime(remainingCancellationTime)}{t('components.waitingOrderModal.minutes')}
                                </span>
                            </p>
                            <button
                                className={styles.waitingOrderModal__button}
                                type='button'
                                onClick={handleCancelOrder}
                            >
                                {t('components.waitingOrderModal.cancelOrder')}
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default WaitingOrderModal;

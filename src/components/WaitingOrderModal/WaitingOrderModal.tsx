import { FC, useEffect } from 'react';
import styles from './WaitingOrderModal.module.scss';
import { useTranslation } from 'react-i18next';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import mockData from '../../utils/serverMocks/orderMock.json';
import { formatTime } from '../../utils/serviceFuncs/formatTime';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEstimatedTime } from '../../services/slices/orderTimeSlice';
import {
    setRemainingTime,
    setCanCancel,
    decrementRemainingTime
} from '../../services/slices/cancellationTimeSlice';
import { RootState } from '../../services/store';

type WaitingOrderModalProps = {
    onCancelOrder: () => void;
};

const WaitingOrderModal: FC<WaitingOrderModalProps> = ({ onCancelOrder }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cancellationPeriod = 3 * 60; // 3 минуты для отмены заказа
    const orderPrepPeriod = 20; // 20 минут для приготовления заказа

    const { remainingTime, canCancel } = useSelector((state: RootState) => state.cancellationTime);

    useEffect(() => {
        dispatch(setEstimatedTime(orderPrepPeriod));
        if(remainingTime === 0) {
            dispatch(setRemainingTime(cancellationPeriod));
        }
        if(canCancel === false) {
            dispatch(setCanCancel(true));
        }

        const cancellationTimer = setInterval(() => {
            dispatch(decrementRemainingTime());
        }, 1000);

        return () => clearInterval(cancellationTimer);
    }, [dispatch, cancellationPeriod, orderPrepPeriod]);

    const formattedCancellationTime = formatTime(remainingTime);

    const handleCancelOrder = () => {
        onCancelOrder();
        navigate('/confirm-cancelling', { replace: true });
    };

    return (
        <div className={styles.waitingOrderModal}>
            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.title')}</h2>
            <h1 className={styles.waitingOrderModal__promocode}>{t('components.waitingOrderModal.promoCode')}</h1>
            <OrderTimeCounter />
            <div className={styles.waitingOrderModal__separator}>
                <OrderListArticle order={mockData}/>
            </div>
            {canCancel && (
                <>
                    <p className={styles.waitingOrderModal__subtitleNote}>
                        {t('components.waitingOrderModal.subtitleNote')}
                        <span className={styles.waitingOrderModal__subtitleNote_orange}>
                            {formattedCancellationTime}
                            {t('components.waitingOrderModal.subtitleNoteMinutes')}
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

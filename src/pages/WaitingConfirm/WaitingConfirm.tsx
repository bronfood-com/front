import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/Modal/Modal';
import OrderListArticle from '../../components/OrderListArticle/OrderListArticle';
import OrderTimeCounter from '../../components/OrderTimeCounter/OrderTimeCounter';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { OrderState } from '../../interfaces/OrderInterface';
import { fetchOrder } from '../../utils/hooks/useOrderDetails/useOrderDetails';
import { formatTime } from '../../utils/serviceFuncs/formatTime';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import styles from './WaitingConfirm.module.scss';
import ConfirmationPopup from '../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import { createPortal } from 'react-dom';
import { cancelOrder } from '../../utils/api/order/orderApi';
import { useNavigate } from 'react-router-dom';
const portalRoot = document.getElementById('portal-root');

interface WaitingConfirmProps {
    clientId: string;
}

const WaitingConfirm: FC<WaitingConfirmProps> = ({ clientId }) => {
    const WAIT_CODE_IN_SECONDS = 5 * 60; // секунд для ожидания кода заказа
    const CANCEL_ORDER_TIME_IN_SECONDS = 2 * 60; // секунд для отмены заказа

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState<OrderState | null>(null);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [initialPreparationTime, setInitialPreparationTime] = useState<number>(0);
    const [cancellationCountdown, setCancellationCountdown] = useState(CANCEL_ORDER_TIME_IN_SECONDS);
    const [waitTime, setWaitTime] = useState(WAIT_CODE_IN_SECONDS);

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const handleCancelOrder = () => {
        setShowConfirmationPopup(true);
    };

    useEffect(() => {
        fetchOrder(clientId, setOrderDetails, (time) => {
            setPreparationTime(time);
            setInitialPreparationTime(time);
        });

        const orderTimer = setInterval(() => {
            setPreparationTime((prevTime) => prevTime - 1);
        }, 60000);

        const waitTimer = setInterval(() => {
            setWaitTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        const cancellationTimer = setInterval(() => {
            setCancellationCountdown((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(orderTimer);
            clearInterval(waitTimer);
            clearInterval(cancellationTimer);
        };
    }, [clientId]);

    const handleConfirmCancellation = async () => {
        if (orderDetails && orderDetails.id) {
            try {
                await cancelOrder(orderDetails.id);
                setShowConfirmationPopup(false);
                setOrderDetails(null);
                setPreparationTime(0);
                setInitialPreparationTime(0);
                setCancellationCountdown(CANCEL_ORDER_TIME_IN_SECONDS);
                setWaitTime(WAIT_CODE_IN_SECONDS);
                navigate('/popup-order-cancelled');
            } catch (error) {
                throw new Error('Ошибка при отмене заказа:');
            }
        }
    };

    return (
        <>
            <Modal>
                {orderDetails ? (
                    <>
                        <h2 className={styles.waitingOrder__title}>{t('components.waitingOrderModal.orderCode')}</h2>
                        <h1 className={styles.waitingOrder__orderCode}>{orderDetails.id}</h1>
                        <OrderTimeCounter remainingTime={preparationTime} initialTime={initialPreparationTime} />
                        <div className={styles.waitingOrder__separator} />
                        <OrderListArticle order={orderDetails} />
                        {cancellationCountdown > 0 && (
                            <div className={styles.waitingOrder__cancelSection}>
                                <p className={styles.waitingOrder__subtitleNote}>
                                    {t('components.waitingOrderModal.youCanCancelTheOrderWithin')}
                                    <span className={styles.waitingOrder__subtitleNote_orange}>
                                        {formatTime(cancellationCountdown)}
                                        {t('components.waitingOrderModal.minutes')}
                                    </span>
                                </p>
                                <button className={styles.waitingOrder__button} type="button" onClick={handleCancelOrder}>
                                    {t('components.waitingOrderModal.cancelOrder')}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className={styles.waitingConfirm__title}>{t('components.waitingConfirmModal.pleaseWaitForTheOrderConfirmation')}</h2>
                        <p className={styles.waitingConfirm__subtitle}>{t('components.waitingConfirmModal.preparationWillBeginUponConfirmation')}</p>
                        <img src={waitingImg} alt="waiting image" className={styles.waitingConfirm__img} />
                        <div className={styles.waitingConfirm__separator} />
                        <ProgressBar initialTime={WAIT_CODE_IN_SECONDS} currentTime={waitTime} />
                        <p className={styles.waitingConfirm__subtitleNote}>{t('components.waitingConfirmModal.pleaseWaitForTheOrderCode')}</p>
                    </>
                )}
            </Modal>
            {showConfirmationPopup &&
                portalRoot &&
                createPortal(
                    <div className={styles.confirmationPopup__wrapper}>
                        <ConfirmationPopup title="Вы уверены, что хотите отменить заказ?" confirmButtonText="Да" onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancellation} />
                    </div>,
                    portalRoot,
                )}
        </>
    );
};

export default WaitingConfirm;

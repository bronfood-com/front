import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/Modal/Modal';
import OrderListArticle from '../../components/OrderListArticle/OrderListArticle';
import OrderTimeCounter from '../../components/OrderTimeCounter/OrderTimeCounter';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { formatTime } from '../../utils/serviceFuncs/formatTime';
import waitingImg from '../../vendor/images/waiting-screen.svg';
import styles from './WaitingOrder.module.scss';
import ConfirmationPopup from '../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import { useOrderContext } from '../../utils/hooks/useOrderContext/useOrderContext';
const portalRoot = document.getElementById('portal-root');

const WaitingOrder: FC = () => {
    const WAIT_CODE_IN_SECONDS = 5 * 60; // секунды для ожидания кода заказа (запросить у бэка)

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { orderDetails, preparationTime, initialPreparationTime, cancellationCountdown, waitOrderCodeTime, showConfirmationPopup, setShowConfirmationPopup, cancelOrder, setErrorMessage } = useOrderContext();

    const handleCancelOrder = () => {
        setShowConfirmationPopup(true);
    };

    const handleConfirmCancellOrder = async () => {
        setShowConfirmationPopup(true);
        try {
            if (!orderDetails) return;
            await cancelOrder(orderDetails.id);
        } catch (error) {
            setErrorMessage(t('components.waitingOrder.errorWhileCancellingTheOrder') as string);
        } finally {
            setShowConfirmationPopup(false);
            navigate('/popup-order-cancelled');
        }
    };

    return (
        <>
            <Modal>
                {orderDetails ? (
                    <>
                        <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.orderCode')}</h2>
                        <h1 className={styles.waitingOrder__orderCode}>{orderDetails.id}</h1>
                        <OrderTimeCounter remainingTime={preparationTime} initialTime={initialPreparationTime} />
                        <div className={styles.waitingOrder__separator} />
                        <OrderListArticle order={orderDetails} />
                        {cancellationCountdown > 0 && (
                            <div className={styles.waitingOrder__cancelSection}>
                                <p className={styles.waitingOrder__subtitleNote}>
                                    {t('components.waitingOrder.youCanCancelTheOrderWithin')}
                                    <span className={styles.waitingOrder__subtitleNote_orange}>
                                        {formatTime(cancellationCountdown)}
                                        {t('components.waitingOrder.minutes')}
                                    </span>
                                </p>
                                <button className={styles.waitingOrder__button} type="button" onClick={handleCancelOrder}>
                                    {t('components.waitingOrder.cancelOrder')}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.pleaseWaitForTheOrderConfirmation')}</h2>
                        <p className={styles.waitingOrder__subtitle}>{t('components.waitingOrder.preparationWillBeginUponConfirmation')}</p>
                        <img src={waitingImg} alt="waiting image" className={styles.waitingOrder__img} />
                        <div className={styles.waitingOrder__separator} />
                        <ProgressBar initialTime={WAIT_CODE_IN_SECONDS} currentTime={waitOrderCodeTime} />
                        <p className={styles.waitingOrder__subtitleNote}>{t('components.waitingOrder.pleaseWaitForTheOrderCode')}</p>
                    </>
                )}
            </Modal>
            {showConfirmationPopup &&
                portalRoot &&
                createPortal(
                    <div className={styles.confirmationPopup__wrapper}>
                        <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToCancelTheOrder')} confirmButtonText={t('components.confirmationPopup.yes')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancellOrder} />
                    </div>,
                    portalRoot,
                )}
        </>
    );
};

export default WaitingOrder;

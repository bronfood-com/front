import { FC, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WaitingOrder.module.scss';
import Modal from '../../../components/Modal/Modal';
import OrderTimeCounter from '../../../components/OrderTimeCounter/OrderTimeCounter';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { useOrderContext } from '../../../utils/hooks/useOrderContext/useOrderContext';
import { formatTime } from '../../../utils/serviceFuncs/formatTime';
import { getMinutesForm } from '../../../utils/serviceFuncs/getMinutesForm';
import PopupOrderCancelled from '../../PopupOrderCancelled/PopupOrderCancelled';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

const WaitingOrder: FC = () => {
    const WAIT_ORDER_ID_INITIAL_TIME = 2 * 60;

    const [showOrderCancelledPopup, setShowOrderCancelledPopup] = useState(false);

    const { t } = useTranslation();

    const { orderedMeal, preparationTime, initialPreparationTime, cancellationCountdown, waitOrderIdTime, showConfirmationPopup, setShowConfirmationPopup, cancelOrder } = useOrderContext();

    const handleCancelOrder = () => {
        setShowConfirmationPopup(true);
    };

    const handleConfirmCancellOrder = () => {
        if (orderedMeal && orderedMeal.id) {
            cancelOrder(orderedMeal.id).then(() => {
                setShowConfirmationPopup(false);
                setShowOrderCancelledPopup(true);
            });
        }
    };

    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowConfirmationPopup(false);
        }
    };

    useEsc(() => setShowConfirmationPopup(false), [setShowConfirmationPopup]);

    return (
        <>
            <Modal>
                {orderedMeal ? (
                    <>
                        <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.orderCode')}</h2>
                        <h1 className={styles.waitingOrder__orderCode}>{orderedMeal.id}</h1>
                        <OrderTimeCounter remainingTime={preparationTime} initialTime={initialPreparationTime} preparationStatus={orderedMeal.preparationStatus} />
                        <div className={styles.waitingOrder__separator} />
                        <OrderListArticle order={orderedMeal} />
                        {cancellationCountdown > 0 && (
                            <div className={styles.waitingOrder__cancelSection}>
                                <p className={styles.waitingOrder__subtitleNote}>
                                    {t('components.waitingOrder.youCanCancelTheOrderWithin')}
                                    <span className={styles.waitingOrder__subtitleNote_orange}>
                                        {formatTime(cancellationCountdown)} {t(getMinutesForm(cancellationCountdown))}
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
                        <span className={styles.waitingOrder__img} />
                        <div className={styles.waitingOrder__separator} />
                        <ProgressBar initialTime={WAIT_ORDER_ID_INITIAL_TIME} currentTime={waitOrderIdTime} />
                        <p className={styles.waitingOrder__subtitleNote}>{t('components.waitingOrder.pleaseWaitForTheOrderCode')}</p>
                    </>
                )}
            </Modal>
            {showConfirmationPopup && (
                <div className={styles.confirmationPopup__wrapper} onClick={handleOverlayClick}>
                    <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToCancelTheOrder')} confirmButtonText={t('components.confirmationPopup.yes')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancellOrder} />
                </div>
            )}
            {showOrderCancelledPopup && <PopupOrderCancelled />}
        </>
    );
};

export default WaitingOrder;

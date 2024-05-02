import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WaitingOrder.module.scss';
import Modal from '../../../components/Modal/Modal';
import OrderTimeCounter from '../../../components/OrderTimeCounter/OrderTimeCounter';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { useOrderContext } from '../../../utils/hooks/useOrderContext/useOrderContext';
import { formatTime } from '../../../utils/serviceFuncs/formatTime';
import PopupOrderCancelled from '../../PopupOrderCancelled/PopupOrderCancelled';
import OrderListArticle from '../OrderListArticle/OrderListArticle';

const WaitingOrder: FC = () => {
    const [showOrderCancelledPopup, setShowOrderCancelledPopup] = useState(false);
    const WAIT_CODE_IN_SECONDS = 5 * 60; // секунды для ожидания кода заказа (запросить у бэка)

    const { t } = useTranslation();

    const {
        orderedMeal,
        preparationTime,
        initialPreparationTime,
        cancellationCountdown,
        waitOrderCodeTime,
        showConfirmationPopup,
        setShowConfirmationPopup,
        cancelOrder,
    } = useOrderContext();

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

    return (
        <>
            <Modal>
                {orderedMeal ? (
                    <>
                        <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.orderCode')}</h2>
                        <h1 className={styles.waitingOrder__orderCode}>{orderedMeal.id}</h1>
                        <OrderTimeCounter remainingTime={preparationTime} initialTime={initialPreparationTime} />
                        <div className={styles.waitingOrder__separator} />
                        <OrderListArticle order={orderedMeal} />
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
                        <span className={styles.waitingOrder__img} />
                        <div className={styles.waitingOrder__separator} />
                        <ProgressBar initialTime={WAIT_CODE_IN_SECONDS} currentTime={waitOrderCodeTime} />
                        <p className={styles.waitingOrder__subtitleNote}>{t('components.waitingOrder.pleaseWaitForTheOrderCode')}</p>
                    </>
                )}
            </Modal>
            {showConfirmationPopup && (
                <div className={styles.confirmationPopup__wrapper}>
                    <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToCancelTheOrder')} confirmButtonText={t('components.confirmationPopup.yes')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancellOrder} />
                </div>
            )}
            {showOrderCancelledPopup && <PopupOrderCancelled />}
        </>
    );
};

export default WaitingOrder;

import { FC, useMemo } from 'react';
import styles from './WaitingOrderModal.module.scss';
import { useTranslation } from 'react-i18next';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import mockData from '../../utils/serverMocks/orderMock.json';
import { formatTime } from '../../utils/serviceFuncs/formatTime';
import { useCancellationTimer } from '../../utils/hooks/useCancellationTimer/useCancallationTimer';

type WaitingOrderModalProps = {
    onCancelOrder: () => void;
};

const WaitingOrderModal: FC<WaitingOrderModalProps> = ({ onCancelOrder }) => {
    const { t } = useTranslation();
    const cancellationPeriod = 3 * 60; // 3 минуты для отмены заказа

    const { remainingTime, canCancel } = useCancellationTimer(cancellationPeriod);

    const formattedCancellationTime = useMemo(() => formatTime(remainingTime), [remainingTime]);

    return (
        <div className={styles.waitingOrderModal}>
            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.title')}</h2>
            <h1 className={styles.waitingOrderModal__promocode}>{t('components.waitingOrderModal.promoCode')}</h1>
            <OrderTimeCounter estimatedTime={15} />
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
                        onClick={onCancelOrder}
                    >
                        {t('components.waitingOrderModal.buttonTitle')}
                    </button>
                </>
            )}
        </div>
    );
};

export default WaitingOrderModal;

import { FC } from 'react';
import styles from './WaitingOrderModal.module.scss';
import { useTranslation } from 'react-i18next';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';

const WaitingOrderModal: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.waitingOrderModal}>
            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.title')}</h2>
            <h1 className={styles.waitingOrderModal__promocode}>{t('components.waitingOrderModal.promoCode')}</h1>
            <OrderTimeCounter />
            <p className={styles.waitingOrderModal__subtitleNote}>{t('components.waitingStatusModal.subtitleNote')}</p>
        </div>
    );
};

export default WaitingOrderModal;

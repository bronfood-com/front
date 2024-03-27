import { FC } from 'react';
import styles from './WaitingOrderModal.module.scss';
import { useTranslation } from 'react-i18next';
import OrderTimeCounter from '../OrderTimeCounter/OrderTimeCounter';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import mockData from '../../utils/serverMocks/orderMock.json';

const WaitingOrderModal: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.waitingOrderModal}>
            <h2 className={styles.waitingOrderModal__title}>{t('components.waitingOrderModal.title')}</h2>
            <h1 className={styles.waitingOrderModal__promocode}>{t('components.waitingOrderModal.promoCode')}</h1>
            <OrderTimeCounter estimatedTime={15}/>
            <OrderListArticle order={mockData}/>
            <p className={styles.waitingOrderModal__subtitleNote}>
                {t('components.waitingOrderModal.subtitleNote')}
                <span className={styles.waitingOrderModal__subtitleNote_orange}>
                    3
                    {t('components.waitingOrderModal.subtitleNoteMinutes')}
                </span>
            </p>
            <button
                className={styles.waitingOrderModal__button}
                type='button'
            >
                {t('components.waitingOrderModal.buttonTitle')}
            </button>
        </div>
    );
};

export default WaitingOrderModal;

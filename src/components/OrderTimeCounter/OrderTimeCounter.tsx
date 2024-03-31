import { FC, useCallback, useMemo } from 'react';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import { useTranslation } from 'react-i18next';
import styles from './OrderTimeCounter.module.scss';

type OrderTimeCounterProps = {
    remainingTime: number;
};

const OrderTimeCounter: FC<OrderTimeCounterProps> = ({ remainingTime }) => {
    const { t } = useTranslation();

    const sign = remainingTime < 0 ? "-" : "";
    const minutes = Math.floor(Math.abs(remainingTime) / 60);
    const seconds = Math.abs(remainingTime) % 60;
    const formattedTime = `${sign}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const getStatusMessage = useCallback(() => {
        if (remainingTime > 0) return 'components.orderTimeCounter.preparing';
        if (remainingTime === 0) return 'components.orderTimeCounter.ready';
        return 'components.orderTimeCounter.delayed';
    }, [remainingTime, t]);

    const containerStyle = useMemo(() => ({
        container: remainingTime <= 0 ? styles.orderTimeCounterExpiredBorder : styles.orderTimeCounter,
        number: remainingTime <= 0 ? styles.timeExpired : '',
        image: remainingTime <= 0 ? styles.imageExpired : '',
    }), [remainingTime]);

    return (
        <div className={containerStyle.container}>
            <div className={styles.orderTimeCounter__container}>
                <div className={styles.orderTimeCounter__time}>
                    <span className={`${styles.orderTimeCounter__image} ${containerStyle.image}`}/>
                    <p className={`${styles.orderTimeCounter__time_number} ${containerStyle.number}`}>
                        {formattedTime}{t('components.orderTimeCounter.minutes')}
                    </p>
                </div>
                <div className={styles.orderTimeCounter__separator}>
                    <ProgressBar />
                </div>
                <p className={styles.orderTimeCounter__subtitle}>
                    {t(getStatusMessage())}
                </p>
            </div>
        </div>
    );
};

export default OrderTimeCounter;

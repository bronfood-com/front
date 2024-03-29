import { FC, useCallback, useMemo } from 'react';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import { useTranslation } from 'react-i18next';
import styles from './OrderTimeCounter.module.scss';
import { useCountdown } from '../../utils/hooks/useCountdown/useCountdown';

type OrderTimeCounterProps = {
    estimatedTime: number;
};

const OrderTimeCounter: FC<OrderTimeCounterProps> = ({ estimatedTime }) => {
    const { t } = useTranslation();
    const roundedRemainingTime = useCountdown(estimatedTime);
    const minutesSuffix = t('components.orderTimeCounter.minutes');

    const getStatusMessageKey = useCallback(() => {
        if (roundedRemainingTime > 0) return 'components.orderTimeCounter.preparing';
        if (roundedRemainingTime === 0) return 'components.orderTimeCounter.ready';
        return 'components.orderTimeCounter.delayed';
    }, [roundedRemainingTime]);

    const formattedTime = useMemo(() => `${roundedRemainingTime}${minutesSuffix}`, [roundedRemainingTime, minutesSuffix]);
    const statusMessage = t(getStatusMessageKey());
    const containerStyles = useMemo(() => ({
        container: roundedRemainingTime < 0 ? styles.orderTimeCounterExpiredBorder : styles.orderTimeCounter,
        number: roundedRemainingTime < 0 ? styles.timeExpired : '',
        image: roundedRemainingTime < 0 ? styles.imageExpired : '',
    }), [roundedRemainingTime]);

    return (
        <div className={containerStyles.container}>
            <div className={styles.orderTimeCounter__container}>
                <div className={styles.orderTimeCounter__time}>
                    <span className={`${styles.orderTimeCounter__image} ${containerStyles.image}`}/>
                    <p className={`${styles.orderTimeCounter__time_number} ${containerStyles.number}`}>
                        {formattedTime}
                    </p>
                </div>
                <div className={styles.orderTimeCounter__separator}>
                    <ProgressBar estimatedTime={estimatedTime} barColor={roundedRemainingTime < 0 ? "#F05252" : "#FF8F0B"} />
                </div>
                <p className={styles.orderTimeCounter__subtitle}>
                    {statusMessage}
                </p>
            </div>
        </div>
    );
};

export default OrderTimeCounter;

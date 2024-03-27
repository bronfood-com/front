import { FC } from 'react';
import styles from './OrderTimeCounter.module.scss';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';
import { useTranslation } from 'react-i18next';

type OrderTimeCounterProps = {
    estimatedTime: number;
}
const OrderTimeCounter: FC<OrderTimeCounterProps> = ({ estimatedTime = 15 }) => {
    const { t } = useTranslation();
  return (
    <div className={styles.orderTimeCounter}>
        <div className={styles.orderTimeCounter__container}>
            <p className={styles.orderTimeCounter__time}>
                <span className={styles.orderTimeCounter__time_number}>{estimatedTime}{t('components.orderTimeCounter.minutes')}</span>
            </p>
            <div className={styles.orderTimeCounter__separator}>
                <ProgressBar duration={estimatedTime * 60 * 1000} />
            </div>
            <p className={styles.orderTimeCounter__subtitle}>
                {t('components.orderTimeCounter.subtitle')}
            </p>
        </div>
    </div>
  )
}

export default OrderTimeCounter;

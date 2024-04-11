import { useTranslation } from 'react-i18next';
import styles from './MealTotal.module.scss';
import Button from '../../../components/Button/Button';

function MealTotal({ price }: { price: number }) {
    const { t } = useTranslation();
    return (
        <div className={styles.meal_total}>
            <div className={styles.meal_total__title}>
                <p className={styles.meal_total__text}>{t(`pages.meal.total`)}</p>
                <span className={styles.meal_total__price}>{`${price} ₸`}</span>
            </div>
            <div className={styles.meal_total__button}>
                <Button>{t(`pages.meal.add`)}</Button>
            </div>
        </div>
    );
}

export default MealTotal;

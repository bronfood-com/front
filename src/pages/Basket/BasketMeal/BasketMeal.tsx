import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { Meal } from '../../../utils/api/basketService/basketService';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ meal }: { meal: Meal }) {
    const { addMeal, deleteMeal } = useBasket();
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${meal.photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{meal.name}</p>
                    <span className={styles.basket_meal__price}>{`${meal.price.toFixed(0)} ₸`}</span>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={meal.quantity} increment={() => addMeal(meal)} decrement={() => deleteMeal(meal)} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;

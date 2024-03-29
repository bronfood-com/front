import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { MealInBasket } from '../../../contexts/BasketContext';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ card }: { card: MealInBasket }) {
    const { addMeal, deleteMeal } = useBasket();
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{card.name}</p>
                    <span className={styles.basket_meal__price}>{`${card.price.toFixed(0)} ₸`}</span>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={card.quantity} increment={() => addMeal(card)} decrement={() => deleteMeal(card)} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;

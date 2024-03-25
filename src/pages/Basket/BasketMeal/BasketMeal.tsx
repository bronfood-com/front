import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { Meal } from '../../../utils/api/restaurantsService/restaurantsService';
import { useState } from 'react';

function BasketMeal({ card }: { card: Meal }) {
    const [count, setCount] = useState(1);
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{card.name}</p>
                    <span className={styles.basket_meal__price}>{`${card.price.toFixed(0)} ₸`}</span>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={count} setCount={setCount} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;

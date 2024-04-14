import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ mealInBasket }: { mealInBasket: MealInBasket }) {
    const { meal, count } = mealInBasket;
    const { id, name, photo, price } = meal;
    const mealPrice = meal.features
        ? meal.features.reduce((acc, current) => {
              const selectedChoice = current.choices.find((choice) => choice.default === true);
              if (selectedChoice) {
                  return acc + selectedChoice.price;
              } else return acc;
          }, 0)
        : price;
    const { addMeal, deleteMeal } = useBasket();
    const handleIncrement = () => {
        if (meal.features) {
            addMeal(id, meal.features);
        } else {
            addMeal(id);
        }
    };
    const handleDecrement = () => {
        deleteMeal(id);
    };
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{name}</p>
                    <span className={styles.basket_meal__price}>{`${mealPrice.toFixed(0)} ₸`}</span>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={count} increment={handleIncrement} decrement={handleDecrement} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;

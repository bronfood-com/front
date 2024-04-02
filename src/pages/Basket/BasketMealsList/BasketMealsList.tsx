import styles from './BasketMealsList.module.scss';
import BasketMeal from '../BasketMeal/BasketMeal';
import { MealInBasket } from '../../../contexts/BasketContext';

const BasketMealsList = ({ meals }: { meals: MealInBasket[] }) => {
    return (
        <ul className={styles.basket_meals_list}>
            {meals.map((meal) => (
                <li key={meal.meal.id}>
                    <BasketMeal meal={meal} />
                </li>
            ))}
        </ul>
    );
};

export default BasketMealsList;

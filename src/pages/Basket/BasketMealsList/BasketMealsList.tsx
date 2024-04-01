import styles from './BasketMealsList.module.scss';
import BasketMeal from '../BasketMeal/BasketMeal';
import { MealInBasket } from '../../../utils/api/basketService/basketService';

const BasketMealsList = ({ meals }: { meals: MealInBasket[] }) => {
    return (
        <ul className={styles.basket_meals_list}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <BasketMeal meal={meal} />
                </li>
            ))}
        </ul>
    );
};

export default BasketMealsList;

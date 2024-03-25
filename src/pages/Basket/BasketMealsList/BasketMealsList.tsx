import styles from './BasketMealsList.module.scss';
import { Meal } from '../../../utils/api/restaurantsService/restaurantsService'
import BasketMeal from '../BasketMeal/BasketMeal';

const BasketMealsList = ({ meals }: { meals: Meal[] }) => {
    return (
        <ul className={styles.basket_meals_list}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <BasketMeal card={meal} />
                </li>
            ))}
        </ul>
    );
};

export default BasketMealsList;

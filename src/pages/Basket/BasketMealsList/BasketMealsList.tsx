import styles from './BasketMealsList.module.scss';
import BasketMeal from '../BasketMeal/BasketMeal';
import { MealInBasket } from '../../../utils/api/basketService/basketService';

const BasketMealsList = ({ meals }: { meals: MealInBasket[] }) => {
    return (
        <ul className={styles.basket_meals_list}>
            {meals.map((meal) => {
                const idPostfix = meal.meal.features
                    .map((feature) => {
                        const choice = feature.choices.find((choice) => choice.chosen || choice.default);
                        if (choice) {
                            return choice.name;
                        }
                    })
                    .toString();
                return (
                    <li key={meal.meal.id + idPostfix}>
                        <BasketMeal mealInBasket={meal} />
                    </li>
                );
            })}
        </ul>
    );
};

export default BasketMealsList;

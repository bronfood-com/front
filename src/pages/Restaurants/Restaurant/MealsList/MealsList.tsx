import styles from './MealsList.module.scss';
import { Meal, Restaurant } from '../../../../utils/api/restaurantsService/restaurantsService';
import BoxFood from '../BoxFood/BoxFood';

const MealsList = ({ meals, restaurant }: { meals: Meal[]; restaurant: Restaurant }) => {
    return (
        <ul className={`${styles.meals_list} ${meals.length === 1 ? styles.meals_list_short : ''}`}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <BoxFood card={meal} restaurant={restaurant} />
                </li>
            ))}
        </ul>
    );
};

export default MealsList;

import styles from './MealsList.module.scss';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import BoxFood from '../BoxFood/BoxFood';

const MealsList = ({ meals }: { meals: Meal[] }) => {
    return (
        <ul className={`${styles.meals_list} ${meals.length === 1 ? styles.meals_list_short : ""}`}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <BoxFood card={meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsList;

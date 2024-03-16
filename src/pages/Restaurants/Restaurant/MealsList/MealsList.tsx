import styles from './MealsList.module.scss';
import BoxFood from '../BoxFood/BoxFood';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';

const MealsList = ({ meals }: { meals: Meal[] }) => {
    return (
        <ul className={styles.meals_list}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <BoxFood card={meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsList;

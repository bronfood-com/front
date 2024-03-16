import styles from './MealsList.module.scss';
import { Link } from 'react-router-dom';
import BoxFood from '../BoxFood/BoxFood';

const MealsList = ({meals}) => {
    return (
        <ul className={styles.meals_list}>
            {meals.map((meal) => (
                <li key={meal.id} className={styles.meals_list_item}>
                    <Link to={`/restaurants/${meal.id}`}>
                        <BoxFood card={meal} />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MealsList;

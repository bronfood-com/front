import styles from './MealImage.module.scss';
import { API_URL } from '../../../utils/consts';

function MealImage({ image }: { image: string }) {
    return (
        <div className={styles.meal_image_container}>
            <div className={styles.meal_image} style={{ backgroundImage: `url(${API_URL}${image})` }} />
        </div>
    );
}

export default MealImage;

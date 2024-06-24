import styles from './RestaurantImage.module.scss';
import { API_URL } from '../../../../utils/consts';

function RestaurantImage({ image }: { image: string }) {
    return (
        <div className={styles.restaurant_image_container}>
            <div className={styles.restaurant_image} style={{ backgroundImage: `url(${API_URL}${image})` }} />
        </div>
    );
}

export default RestaurantImage;

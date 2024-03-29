import styles from './BasketRestaurant.module.scss';
import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';
import ButtonIconSquare from '../../../components/ButtonIconSquare/ButtonIconSquare';

function BasketRestaurant({ restaurant, emptyBasket }: { restaurant: Restaurant; emptyBasket: () => void }) {
    return (
        <div className={styles.basket_restaurant}>
            <div className={styles.basket_restaurant__container}>
                <div className={styles.basket_restaurant__image} style={{ backgroundImage: `url(${restaurant.photo})` }} />
                <div className={styles.basket_restaurant__description}>
                    <p className={styles.basket_restaurant__name}>{restaurant.name}</p>
                    <div className={styles.basket_restaurant__feature}>
                        <div className={`${styles.basket_restaurant__icon} ${styles.basket_restaurant__icon_placemark} ${styles.basket_restaurant__icon_small}`} />
                        <p className={styles.basket_restaurant__feature_title}>{restaurant.address}</p>
                    </div>
                </div>
            </div>
            <ButtonIconSquare onClick={emptyBasket} icon="delete" />
        </div>
    );
}

export default BasketRestaurant;

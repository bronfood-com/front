import styles from './RestaurantCardLarge.module.scss'
import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';

function RestaurantCardLarge({ card }: { card: Restaurant }) {

    return (
        <div className={styles.card}>
            <div className={styles.card__container}>
                <div className={styles.card__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.card__description}>
                    <div className={styles.card__title_container}>
                        <p className={styles.card__title}>{card.name}</p>
                        <p className={styles.card__rating}>{card.rating.toFixed(1)}</p>
                        <div className={`${styles.card__icon} ${styles.card__icon_star} ${styles.card__icon_large}`} />
                    </div>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_placemark} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCardLarge;

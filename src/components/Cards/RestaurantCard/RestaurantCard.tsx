import styles from './RestaurantCard.module.scss';
import { Restaurant } from '../../../pages/Restaurants/MockRestaurantsList';

function RestaurantCard({ card, onClick }: { card: Restaurant, onClick: () => void }) {
    return (
        <div className={styles.card} onClick={() => onClick()}>
            <div className={styles.card__container}>
                <div className={styles.card__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.card__description}>
                    <div className={styles.card__title_container}>
                        <p className={styles.card__title}>{card.name}</p>
                        <p className={styles.card__rating}>{card.rating}</p>
                        <div className={`${styles.card__icon} ${styles.card__icon_star} ${styles.card__icon_large}`} />
                    </div>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_placemark} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.address}</p>
                    </div>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_clock} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.workingTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCard;

import { RefObject, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import styles from './RestaurantCard.module.scss';
import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';

function RestaurantCard({ card, isTheOnlyOne, container }: { card: Restaurant; isTheOnlyOne: boolean; container: RefObject<Element> }) {
    const { setActiveRestaurant } = useRestaurants();
    const ref = useRef(null);

    const isInView = useInView(ref, {
        amount: 'all',
        root: container,
        margin: '-18% 0px -18% 0px',
    });

    useEffect(() => {
        if (isInView) {
            setActiveRestaurant(card.id);
        }
    }, [card.id, isInView, setActiveRestaurant]);

    return (
        <div ref={ref} className={`${styles.card} ${isInView || isTheOnlyOne ? styles.card__active : ''}`}>
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

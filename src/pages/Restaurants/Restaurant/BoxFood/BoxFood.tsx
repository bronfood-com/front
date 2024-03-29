import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal, Restaurant } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useBasket } from '../../../../utils/hooks/useBasket/useBasket';

function BoxFood({ card, restaurant }: { card: Meal; restaurant: Restaurant }) {
    const { addToBasket } = useBasket();
    return (
        <div className={`${styles.boxfood}`}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button onClick={() => addToBasket(restaurant, card)} type="button" icon="add" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;

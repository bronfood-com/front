import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal, Restaurant } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useBasket } from '../../../../utils/hooks/useBasket/useBasket';
import { FormEvent } from 'react';

function BoxFood({ card, restaurant }: { card: Meal; restaurant: Restaurant }) {
    const { addToBasket } = useBasket();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addToBasket(restaurant, card);
    };
    return (
        <div className={`${styles.boxfood}`}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                    <form className={styles.boxfood__button} onSubmit={handleSubmit}>
                        <Button type="submit" icon="add" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;

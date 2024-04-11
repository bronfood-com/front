import { Link, useLocation } from 'react-router-dom';
import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useBasket } from '../../../../utils/hooks/useBasket/useBasket';
import { FormEvent } from 'react';

function BoxFood({ card }: { card: Meal }) {
    const { pathname } = useLocation();
    const { addMeal, isLoading } = useBasket();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMeal(card.id);
    };
    return (
        <Link to={`${pathname}/meal/${card.id}`}>
            <div className={`${styles.boxfood}`}>
                <div className={styles.boxfood__container}>
                    <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                    <div className={styles.boxfood__description}>
                        <p className={styles.boxfood__name}>{card.name}</p>
                        <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                        <form className={styles.boxfood__button} onSubmit={handleSubmit}>
                            <Button type="submit" icon="add" isActive={isLoading} disabled={isLoading} />
                        </form>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BoxFood;

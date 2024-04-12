import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useBasket } from '../../../../utils/hooks/useBasket/useBasket';

function BoxFood({ card }: { card: Meal }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { addMeal, isLoading } = useBasket();
    const hasFeatures = 'features' in card;
    const handleClick = () => {
        if (!hasFeatures) {
            addMeal(card.id);
        } else {
            navigate(`${pathname}/meal/${card.id}`)
        }
    };
    return (
        <div className={`${styles.boxfood}`} onClick={handleClick}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button type="button" icon="add" isActive={isLoading} disabled={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;

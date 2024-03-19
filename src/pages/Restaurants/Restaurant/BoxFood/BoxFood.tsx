import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonB/ButtonB';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';

function BoxFood({ card }: { card: Meal }) {
    return (
        <div className={`${styles.boxfood}`}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button type="button" icon="add" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;

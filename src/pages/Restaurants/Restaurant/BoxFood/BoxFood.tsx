import styles from './BoxFood.module.scss';
import ButtonHeader from '../../../../components/ButtonHeader/ButtonHeader';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';

function BoxFood({ card }: { card: Meal }) {
    return (
        <div className={`${styles.boxfood}`}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price.toFixed(0)} ₸`}</span>
                    <ButtonHeader type="button" icon="add" position={{ right: '10px', bottom: '15px' }} opacity="100%" />
                </div>
            </div>
        </div>
    );
}

export default BoxFood;

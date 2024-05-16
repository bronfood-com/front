import { sumBy } from 'lodash';
import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ mealInBasket }: { mealInBasket: MealInBasket }) {
    const { meal, count } = mealInBasket;
    const { id, name, photo, price, features } = meal;
    const mealPrice =
        meal.features.length > 0
            ? sumBy(meal.features, (feature) => {
                  const isChosen = feature.choices.some((choice) => choice.chosen);
                  if (isChosen) {
                      return feature.choices.filter((choice) => choice.chosen)[0].price;
                  } else {
                      return feature.choices.filter((choice) => choice.default)[0].price;
                  }
              })
            : price;
    const featureName = 'Размер';
    const toppings = features.length > 0 && features.filter((feature) => feature.name !== featureName);
    const size = features.length > 0 ? features.filter((feature) => feature.name === featureName)[0].choices.filter((choice) => choice.chosen)[0].name : null;
    const { addMeal, deleteMeal } = useBasket();
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{name}</p>
                        <ul>
                            {toppings && toppings
                                .map((feature) => {
                                    const choice = feature.choices.find((choice) => choice.chosen);
                                    if (choice) {
                                        return (
                                            <li key={feature.id}>
                                                <p className={styles.basket_meal__feature}>{choice.name}</p>
                                            </li>
                                        );
                                    }
                                })
                            }
                        </ul>
                    <p className={styles.basket_meal__size}>
                        {size}
                        <span className={styles.basket_meal__price}>{` ${mealPrice.toFixed(0)} ₸`}</span>
                    </p>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={count} increment={() => addMeal({ mealId: id, features })} decrement={() => deleteMeal({ mealId: id, features })} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;

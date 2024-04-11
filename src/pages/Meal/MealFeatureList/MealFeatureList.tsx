import styles from './MealFeatureList.module.scss';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import MealFeature from '../MealFeature/MealFeature';

const MealFeatureList = ({ features }: { features: MealInBasket[] }) => {
    return (
        <ul className={styles.feature_list}>
            {features.map((feature) => (
                <li key={feature.id}>
                    <MealFeature feature={feature} />
                </li>
            ))}
        </ul>
    );
};

export default MealFeatureList;

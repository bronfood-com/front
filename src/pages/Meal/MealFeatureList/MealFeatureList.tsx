import styles from './MealFeatureList.module.scss';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import MealFeature from '../MealFeature/MealFeature';
import { useRef } from 'react';

const MealFeatureList = ({ features }: { features: MealInBasket[] }) => {
    const featuresContainer = useRef(null);
    return (
        <ul ref={featuresContainer} className={styles.feature_list}>
            {features.map((feature) => (
                <li key={feature.id}>
                    <MealFeature feature={feature} container={featuresContainer} />
                </li>
            ))}
        </ul>
    );
};

export default MealFeatureList;

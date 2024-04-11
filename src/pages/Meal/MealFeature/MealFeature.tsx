import FeatureChoiceList from '../FeatureChoiceLIst/FeatureChoiceList';
import styles from './MealFeature.module.scss';

const MealFeature = ({ feature, container }) => {
    const { name, choices } = feature;
    return (
        <div className={styles.feature}>
            <p className={styles.feature__name}>{name}</p>
            <FeatureChoiceList featureName={feature.name} choices={choices} container={container} />
        </div>
    );
};

export default MealFeature;

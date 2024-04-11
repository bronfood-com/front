import FeatureChoiceList from '../FeatureChoiceLIst/FeatureChoiceList';
import styles from './MealFeature.module.scss';

const MealFeature = ({ feature }) => {
    const { name, choices } = feature;
    return (
        <div className={`${styles.feature}`}>
            <div className={styles.feature__container}>
                <div className={styles.feature__description}>
                    <p className={styles.feature__name}>{name}</p>
                    <FeatureChoiceList featureName={feature.name} choices={choices} />
                </div>
            </div>
        </div>
    );
}

export default MealFeature;

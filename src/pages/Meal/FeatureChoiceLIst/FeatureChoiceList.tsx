import FeatureChoice from '../FeatureChoice/FeatureChoice';
import styles from './FeatureChoiceList.module.scss';

const FeatureChoiceList = ({ featureName, choices, container }) => {
    return (
        <fieldset className={styles.choice_list}>
            {choices.map((choice) => (
                <FeatureChoice key={choice.id} featureName={featureName} choice={choice} container={container} />
            ))}
        </fieldset>
    );
};

export default FeatureChoiceList;

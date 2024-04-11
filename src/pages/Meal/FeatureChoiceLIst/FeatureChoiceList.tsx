import FeatureChoice from "../FeatureChoice/FeatureChoice";
import styles from './FeatureChoiceList.module.scss'

const FeatureChoiceList = ({ featureName, choices }) => {
    return (
        <fieldset className={styles.choice_list}>
            {choices.map((choice) => (
                <FeatureChoice key={choice.id} featureName={featureName} choice={choice} />
            ))}
        </fieldset>
    );
};

export default FeatureChoiceList


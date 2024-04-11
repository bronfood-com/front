import RadioButton from '../../../components/RadioButton/RadioButton';
import styles from './FeatureChoice.module.scss';

function FeatureChoice ({ featureName, choice }) {
    return (
        <div className={`${styles.choice}`}>
            <div className={styles.choice__container}>
                <RadioButton id={choice.id} value={choice.name} name={featureName} />
                <label htmlFor={choice.id} className={styles.choice__name}>{choice.name}</label>
                <span className={styles.choice__price}>{`${choice.price.toFixed(0)} ₸`}</span>
            </div>
        </div>
    );
}

export default FeatureChoice;

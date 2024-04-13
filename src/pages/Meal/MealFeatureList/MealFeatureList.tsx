import { useRef } from 'react';
import { useInView } from 'framer-motion';
import styles from './MealFeatureList.module.scss';
import { useFormContext } from 'react-hook-form';

const MealFeatureList = ({ features }) => {
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

function MealFeature({ feature, container }) {
    const { name, choices } = feature;
    return (
        <div className={styles.feature}>
            <p className={styles.feature__name}>{name}</p>
            <ChoiceList featureName={name} choices={choices} container={container} />
        </div>
    );
}

function ChoiceList({ featureName, choices, container }) {
    return (
        <fieldset className={styles.choice_list}>
            {choices.map((choice) => (
                <Choice key={choice.id} featureName={featureName} choice={choice} container={container} />
            ))}
        </fieldset>
    );
}

function Choice({ featureName, choice, container }) {
    const { register } = useFormContext();
    const choiceRef = useRef(null);
    const isInView = useInView(choiceRef, {
        amount: 'all',
        root: container,
    });
    return (
        <div ref={choiceRef} className={`${styles.choice} ${!isInView && styles.choice_blur}`}>
            <div className={styles.choice__container}>
                <input type="radio" id={choice.id} value={choice.name} name={featureName} defaultChecked={choice.default} className={styles.radioButton} {...register(featureName)} />
                <label htmlFor={choice.id} className={styles.choice__name}>
                    {choice.name}
                </label>
                <span className={styles.choice__price}>{`${choice.price.toFixed(0)} ₸`}</span>
            </div>
        </div>
    );
}

export default MealFeatureList;

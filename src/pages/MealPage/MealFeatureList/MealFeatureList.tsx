import { RefObject, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useInView } from 'framer-motion';
import styles from './MealFeatureList.module.scss';
import { Choice as ChoiceType, Feature } from '../../../utils/api/restaurantsService/restaurantsService';

const MealFeatureList = ({ features }: { features: Feature[] | [] }) => {
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

function MealFeature({ feature, container }: { feature: Feature; container: RefObject<Element> }) {
    const { name, choices } = feature;
    return (
        <div className={styles.feature}>
            <p className={styles.feature__name}>{name}</p>
            <ChoiceList featureName={name} choices={choices} container={container} />
        </div>
    );
}

function ChoiceList({ featureName, choices, container }: { featureName: string; choices: ChoiceType[]; container: RefObject<Element> }) {
    return (
        <fieldset name={featureName} className={styles.choice_list}>
            {choices.map((choice) => (
                <Choice key={choice.id} featureName={featureName} choice={choice} container={container} />
            ))}
        </fieldset>
    );
}

function Choice({ featureName, choice, container }: { featureName: string; choice: ChoiceType; container: RefObject<Element> }) {
    const { register } = useFormContext();
    const choiceRef = useRef(null);
    const isInView = useInView(choiceRef, {
        amount: 'all',
        root: container,
    });
    return (
        <div ref={choiceRef} className={`${styles.choice} ${!isInView && styles.choice_blur}`}>
            <label className={styles.choice__container}>
                <input type="radio" value={choice.name} defaultChecked={choice.default} className={styles.radioButton} {...register(featureName)} />
                <span className={styles.choice__name}>{choice.name}</span>
                <span className={styles.choice__price}>{`${choice.price.toFixed(0)} ₸`}</span>
            </label>
        </div>
    );
}

export default MealFeatureList;

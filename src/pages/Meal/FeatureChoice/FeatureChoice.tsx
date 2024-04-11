import { useRef } from 'react';
import { useInView } from 'framer-motion';
import RadioButton from '../../../components/RadioButton/RadioButton';
import styles from './FeatureChoice.module.scss';

function FeatureChoice({ featureName, choice, container }) {
    const choiceRef = useRef(null);
    const isInView = useInView(choiceRef, {
        amount: 'all',
        root: container,
    });
    return (
        <div ref={choiceRef} className={`${styles.choice} ${!isInView && styles.choice_blur}`}>
            <div className={styles.choice__container}>
                <RadioButton id={choice.id} value={choice.name} name={featureName} defaultChecked={choice.default} />
                <label htmlFor={choice.id} className={styles.choice__name}>
                    {choice.name}
                </label>
                <span className={styles.choice__price}>{`${choice.price.toFixed(0)} ₸`}</span>
            </div>
        </div>
    );
}

export default FeatureChoice;

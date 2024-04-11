import { FC, InputHTMLAttributes } from 'react';
import styles from './RadioButton.module.scss';

const RadioButton: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
    return (
        <input {...props} type='radio' className={styles.radioButton}/>
    );
};

export default RadioButton;

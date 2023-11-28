import { FC } from 'react';
import styles from './Input.module.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Input {
    /**
     * HTML type for the input
     */
    type: string;
    /**
     * Title for input
     */
    nameLabel: string;
    /**
     * Placeholder for input
     */
    placeholder: string;
    /**
     * Name of input
     */
    name: string;
    register: UseFormRegister<FieldValues>;
}

const Input: FC<Input> = (props) => {
    const inputId = `${props.name}_id`;
    return (
        <div className={styles.input}>
            <label htmlFor={inputId} className={styles.input__label}>
                {props.nameLabel}
            </label>
            <input id={inputId} className={styles.input__place} type={props.type} placeholder={props.placeholder} {...props.register(props.name, { required: 'Заполните все необходимые поля' })}></input>
        </div>
    );
};

export default Input;

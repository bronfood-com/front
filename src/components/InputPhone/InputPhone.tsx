import { FC } from 'react';
import styles from './InputPhone.module.scss';
import { useId } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface InputPhone {
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
    /**
     * Register function inputs
     */
    register: UseFormRegister<FieldValues>;
    /**
     * React Hook Forms error object
     */
    errors: FieldErrors;
    /**
     * RegExp for input validation
     */
    pattern: RegExp;
    /**
     * Input Mask
     */
    mask: string | (string | RegExp)[];
}

const InputPhone: FC<InputPhone> = (props) => {
    const errorMessage = (props.errors[props.name]?.message as string) || undefined;

    const id = useId();
    return (
        <div className={styles.input}>
            <label htmlFor={id} className={`${styles.input__label} ${errorMessage ? styles.input__label__error : ''}`}>
                {props.nameLabel}
            </label>
            <InputMask
                id={id}
                className={`${styles.input__place}`}
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.name, {
                    required: 'Обязательное поле',
                    pattern: {
                        value: props.pattern,
                        message: 'Неверный ввод',
                    },
                })}
                mask={props.mask}
            ></InputMask>
            {errorMessage && <p className={styles.input__error}>{errorMessage}</p>}
        </div>
    );
};

export default InputPhone;

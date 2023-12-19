import { FC } from 'react';
import styles from './InputPhone.module.scss';
import { useId } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { regexPhoneNumberKazakhstan } from '../../utils/consts';

interface InputPhone {
    /**
     * Register function inputs
     */
    register: UseFormRegister<FieldValues>;
    /**
     * React Hook Forms error object
     */
    errors: FieldErrors;
}

const InputPhone: FC<InputPhone> = (props) => {
    const errorMessage = (props.errors['input_telephone']?.message as string) || undefined;

    const id = useId();
    return (
        <div className={styles.input}>
            <label htmlFor={id} className={`${styles.input__label} ${errorMessage ? styles.input__label__error : ''}`}>
                Телефон
            </label>
            <InputMask
                id={id}
                className={`${styles.input__place}`}
                type="tel"
                placeholder="+7 (***)"
                {...props.register('input_telephone', {
                    required: 'Обязательное поле',
                    pattern: {
                        value: regexPhoneNumberKazakhstan,
                        message: 'Неверный ввод',
                    },
                })}
                mask="+7 (999) 99-99-99"
            ></InputMask>
            {errorMessage && <p className={styles.input__error}>{errorMessage}</p>}
        </div>
    );
};

export default InputPhone;

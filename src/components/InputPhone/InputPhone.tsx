import { FC } from 'react';
import styles from './InputPhone.module.scss';
import { useId } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { regexPhoneNumberKazakhstan } from '../../utils/consts';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const errorMessage = (props.errors['phoneNumber']?.message as string) || undefined;

    const id = useId();
    return (
        <div className={styles.input}>
            <label htmlFor={id} className={`${styles.input__label} ${errorMessage ? styles.input__label__error : ''}`}>
                {t('components.inputPhone.phoneNumber')}
            </label>
            <InputMask
                id={id}
                className={`${styles.input__place}`}
                type="tel"
                placeholder="+7 (***)"
                {...props.register('phoneNumber', {
                    required: t('components.inputPhone.required'),
                    pattern: {
                        value: regexPhoneNumberKazakhstan,
                        message: t('components.inputPhone.invalidPhoneNumberFormat'),
                    },
                })}
                mask="+7 (999) 999-99-99"
            ></InputMask>
            {errorMessage && <p className={styles.input__error}>{errorMessage}</p>}
        </div>
    );
};

export default InputPhone;

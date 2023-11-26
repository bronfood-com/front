import { FC } from 'react';
import styles from './Input.module.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Input {
    type: string;
    nameLabel: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<FieldValues>;
}

const Input: FC<Input> = (props) => {
    return (
        <div className={styles.input}>
            <label className={styles.input__label}>{props.nameLabel}</label>
            <input className={styles.input__place} type={props.type} placeholder={props.placeholder} {...props.register(props.name, { required: 'Заполните все необходимые поля' })}></input>
        </div>
    );
};

export default Input;

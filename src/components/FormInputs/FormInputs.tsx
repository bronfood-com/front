import { FC, ReactNode } from 'react';
import styles from './FormInputs.module.scss';

interface FormInputs {
    children?: ReactNode;
}
const FormInputs: FC<FormInputs> = (props) => {
    return <div className={styles.form__inputs}>{props.children}</div>;
};

export default FormInputs;

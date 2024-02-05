import { FC } from 'react';
import styles from './ErrorMessage.module.scss';

const ErrorMessage: FC = () => {
    return (
        <div className={styles.error}>
            <div className={styles.error__container}>
                <div className={styles.error__icon} />
                <p className={styles.error__text}>
                    Телефон или пароль введен неверно, повторите попытку еще раз.
                </p>
            </div>
        </div>
    )
};

export default ErrorMessage;

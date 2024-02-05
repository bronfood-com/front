import { FC } from 'react';
import styles from './ErrorMessage.module.scss';

const ErrorMessage: FC = ({message}: {message: string}) => {
    return (
        <div className={styles.error}>
            <div className={styles.error__container}>
                <div className={styles.error__icon} />
                <p className={styles.error__text}>{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;

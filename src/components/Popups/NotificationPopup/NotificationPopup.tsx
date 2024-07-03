import { FC } from 'react';
import styles from './NotificationPopup.module.scss';

interface NotificationPopupProps {
    message?: string;
    type: 'error' | 'warning' | 'success';
}

const NotificationPopup: FC<NotificationPopupProps> = ({ message, type }) => {
    const getIconClass = () => {
        switch (type) {
            case 'error':
                return styles['error-icon'];
            case 'warning':
                return styles['warning-icon'];
            case 'success':
                return styles['success-icon'];
            default:
                return '';
        }
    };

    return (
        <div className={styles['notification-popup']}>
            <div className={`${styles['notification-popup__container']} ${styles[type]}`}>
                <div className={`${styles['notification-popup__icon']} ${getIconClass()}`} />
                <p className={styles['notification-popup__text']}>{message}</p>
            </div>
        </div>
    );
};

export default NotificationPopup;

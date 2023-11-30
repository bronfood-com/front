import { FC, ReactNode } from 'react';
import styles from './Popup.module.scss';

interface PopupForm {
    /**
     * Main popup title
     */
    title: string;
    /**
     * Elements that popup contains
     */
    children: ReactNode;
}

const PopupForm: FC<PopupForm> = (props) => {
    return (
        <div className={styles.popup}>
            <h2 className={styles.popup__title}>{props.title}</h2>
            {props.children}
            <button className={`${styles.popup__close} button`} type="button"></button>
        </div>
    );
};

export default PopupForm;

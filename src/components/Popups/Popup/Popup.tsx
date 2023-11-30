import { FC, ReactNode } from 'react';
import styles from './Popup.module.scss';

interface Popup {
    /**
     * Main popup title
     */
    title?: string;
    /**
     * Personal parameters for popup
     */
    mode?: string;
    /**
     * Elements that popup contains
     */
    children: ReactNode;
}

const Popup: FC<Popup> = (props) => {
    return (
        <div className={`${styles.popup} ${styles[`popup_${props.mode}`]}`}>
            {props.title && <h2 className={styles.popup__title}>{props.title}</h2>}
            {props.children}
            <button className={`${styles.popup__close} button`} type="button"></button>
        </div>
    );
};

export default Popup;

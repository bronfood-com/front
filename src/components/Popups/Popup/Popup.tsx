import { FC, ReactNode, useEffect, MouseEvent } from 'react';
import styles from './Popup.module.scss';

interface Popup {
    /**
     * Main popup title
     */
    title?: string;
    /**
     * Choose type of popup: info
     */
    mode?: 'info';
    /**
     * Handle close popup
     */
    onClose: () => void;
    /**
     * Elements that popup contains
     */
    children: ReactNode;
}

const Popup: FC<Popup> = (props) => {
    const handleCloseButton = () => {
        props.onClose();
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && props.onClose();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.popup_overlay} onClick={handleOverlayClick}>
            <div className={`${styles.popup} ${styles[`popup_${props.mode}`]}`}>
                {props.title && <h2 className={`${styles.popup__title} ${styles[`popup__title_${props.mode}`]}`}>{props.title}</h2>}
                {props.children}
                <button className={`${styles.popup__close} ${styles[`popup__close_${props.mode}`]} button`} type="button" onClick={handleCloseButton}></button>
            </div>
        </div>
    );
};

export default Popup;

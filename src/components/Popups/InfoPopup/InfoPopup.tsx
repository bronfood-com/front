import { FC, ReactNode } from 'react';
import styles from './InfoPopup.module.scss';

interface InfoPopup {
    /**
     * Main popup title
     */
    title?: string;
    /**
     * Choose type of popup: info
     */
    mode?: 'info';
    /**
     * Elements that popup contains
     */
    children: ReactNode;
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Handle closing infoPopup
     */
    openInfoPopup: () => void;
}

const InfoPopup: FC<InfoPopup> = (props) => {
    const handleCloseButton = () => {
        props.openInfoPopup();
    };
    return (
        <div className={`${styles.popup_overlay} ${props.isOpened ? '' : styles.popup_hide}`}>
            <div className={`${styles.popup} ${styles[`popup_${props.mode}`]} ${props.isOpened ? '' : styles.popup_hide}`}>
                {props.title && <h2 className={`${styles.popup__title} ${styles[`popup__title_${props.mode}`]}`}>{props.title}</h2>}
                {props.children}
                <button className={`${styles.popup__close} ${styles[`popup__close_${props.mode}`]} button`} type="button" onClick={handleCloseButton}></button>
            </div>
        </div>
    );
};

export default InfoPopup;

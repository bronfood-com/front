import { FC, ReactNode } from 'react';
import styles from './InfoPopup.module.scss';

interface InfoPopup {
    /**
     * Elements that popup contains
     */
    children: ReactNode;
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Handle open/closing infoPopup (add true or false)
     */
    handleInfoPopup: (value: boolean) => void;
    /**
     * Has this info window close button?
     */
    hasCloseButton?: boolean;
}

const InfoPopup: FC<InfoPopup> = (props) => {
    const handleCloseButton = () => {
        props.handleInfoPopup(false);
    };
    return (
        <div className={`${styles.popup__overlay} ${props.isOpened ? '' : styles.popup__overlay_hide}`}>
            <div className={`${styles.popup} ${props.isOpened ? '' : styles.popup_hide}`}>
                {props.children}
                {props.hasCloseButton ? <button className={styles.popup__close} type="button" onClick={handleCloseButton}></button> : ''}
            </div>
        </div>
    );
};

export default InfoPopup;

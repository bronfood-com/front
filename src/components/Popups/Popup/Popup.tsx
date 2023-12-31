import { FC, ReactNode } from 'react';
import styles from './Popup.module.scss';
import { useNavigate } from 'react-router-dom';

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
     * Elements that popup contains
     */
    children: ReactNode;
}

const Popup: FC<Popup> = (props) => {
    const navigate = useNavigate();
    const handleCloseButton = () => {
        navigate('/');
    };
    return (
        <div className={`${styles.popup} ${styles[`popup_${props.mode}`]}`}>
            {props.title && <h2 className={`${styles.popup__title} ${styles[`popup__title_${props.mode}`]}`}>{props.title}</h2>}
            {props.children}
            <button className={`${styles.popup__close} ${styles[`popup__close_${props.mode}`]} button`} type="button" onClick={handleCloseButton}></button>
        </div>
    );
};

export default Popup;

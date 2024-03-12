import { useEffect, MouseEvent } from 'react';
import styles from './RestaurantPopup.module.scss';

const RestaurantPopup = ({ close, children }) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && close();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.restaurant_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.restaurant_popup}>{children}</div>
        </div>
    );
};

export default RestaurantPopup;

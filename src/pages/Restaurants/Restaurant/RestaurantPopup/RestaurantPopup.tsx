import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './RestaurantPopup.module.scss';
import Button from '../../../../components/ButtonA/ButtonA';

type RestaurantPopupProps = {
    close: () => void;
    onClick: () => void;
    isLiked: boolean;
    children?: ReactNode;
};

const RestaurantPopup = ({ close, onClick, isLiked, children }: RestaurantPopupProps) => {
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
            <div className={styles.restaurant_popup}>
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_favorite}`}>
                    <Button type="button" onClick={onClick} isActive={isLiked} icon="favorite" />
                </div>
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default RestaurantPopup;

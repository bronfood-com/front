import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './RestaurantPopup.module.scss';
import Button from '../../../../components/ButtonIconRound/ButtonIconRound';
import { useNavigate } from 'react-router-dom';

type RestaurantPopupProps = {
    close: () => void;
    children?: ReactNode;
};

const RestaurantPopup = ({ close, children }: RestaurantPopupProps) => {
    const navigate = useNavigate();
    const openBasket = () => {
        navigate('/basket');
    };
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
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_basket}`}>
                    <Button type="button" onClick={openBasket} icon="close" />
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

import { MouseEvent, ReactNode } from 'react';
import styles from './RestaurantPopup.module.scss';
import Button from '../../../../components/ButtonIconRound/ButtonIconRound';
import { useEsc } from '../../../../utils/hooks/useEsc/useEsc';

type RestaurantPopupProps = {
    close: () => void;
    children?: ReactNode;
};

const RestaurantPopup = ({ close, children }: RestaurantPopupProps) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(close);
    return (
        <div className={styles.restaurant_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.restaurant_popup}>
                <div className={`${styles.restaurant_popup_button} ${styles.restaurant_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default RestaurantPopup;

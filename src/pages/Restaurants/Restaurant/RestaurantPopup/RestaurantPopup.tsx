import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './RestaurantPopup.module.scss';
import ButtonRound from '../../../../components/ButtonRound/ButtonRound';

type RestaurantPopupProps = {
    close: () => void;
    openFavourites: () => void;
    children?: ReactNode;
}

const RestaurantPopup = ({ close, openFavourites, children }: RestaurantPopupProps) => {
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
                <ButtonRound onClick={() => openFavourites()} backgroundColor="white" icon="favourite" position={{ top: '15px', right: '69px' }} />
                <ButtonRound onClick={() => close()} backgroundColor="white" icon="close" position={{ top: '15px', right: '16px' }} />
                {children}
            </div>
        </div>
    );
};

export default RestaurantPopup;

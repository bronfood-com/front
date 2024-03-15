import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './RestaurantPopup.module.scss';
import Button from '../../../../components/ButtonDelete/ButtonDelete';

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
                <Button onClick={() => onClick()} isActive={isLiked} icon="favorite" position={{ top: '15px', right: '69px' }} opacity="85%" />
                <Button onClick={() => close()} icon="close" position={{ top: '15px', right: '16px' }} opacity="85%" />
                {children}
            </div>
        </div>
    );
};

export default RestaurantPopup;

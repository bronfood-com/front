import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './BasketPopup.module.scss';
import Button from '../../../components/ButtonIconSquare/ButtonIconSquare';

type BasketPopupProps = {
    goBack: () => void;
    close: () => void;
    children?: ReactNode;
};

const BasketPopup = ({ goBack, close, children }: BasketPopupProps) => {
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
        <div className={styles.basket_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.basket_popup}>
                <div className={`${styles.basket_popup_button} ${styles.basket_popup_button_back}`}>
                    <Button type="button" onClick={goBack} icon="back" />
                </div>
                <div className={`${styles.basket_popup_button} ${styles.basket_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default BasketPopup;

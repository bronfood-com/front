import { useEffect, MouseEvent, ReactNode } from 'react';
import styles from './MealPopup.module.scss';
import Button from '../../../components/ButtonIconRound/ButtonIconRound';

type MealPopupProps = {
    goBack: () => void;
    close: () => void;
    children?: ReactNode;
};

const MealPopup = ({ goBack, close, children }: MealPopupProps) => {
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
        <div className={styles.meal_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.meal_popup}>
                <div className={`${styles.meal_popup_button} ${styles.meal_popup_button_back}`}>
                    <Button type="button" onClick={goBack} icon="back" />
                </div>
                <div className={`${styles.meal_popup_button} ${styles.meal_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default MealPopup;

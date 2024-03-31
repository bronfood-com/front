import { FC, useEffect, MouseEvent } from 'react';
import styles from './BasketConfirmation.module.scss';
import { useTranslation } from 'react-i18next';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

const BasketConfirmation: FC = ({ close }) => {
    const { emptyBasket, isLoading } = useBasket();
    const { t } = useTranslation();
    const handleSubmit = () => {
        emptyBasket();
        close();
    };
    const handleCancel = () => close();
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && handleCancel();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    });
    return (
        <div className={styles.basket_confirmation} onClick={handleOverlayClick}>
            <ConfirmationPopup title={t(`pages.basket.emptyBasket`)} confirmButtonText={t(`pages.basket.yes`)} onCancel={handleCancel} onSubmit={handleSubmit}>
                {isLoading && <Preloader />}
            </ConfirmationPopup>
        </div>
    );
};

export default BasketConfirmation;
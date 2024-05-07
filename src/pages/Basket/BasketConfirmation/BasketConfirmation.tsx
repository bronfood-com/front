import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BasketConfirmation.module.scss';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

const BasketConfirmation = ({ close }: { close: () => void }) => {
    const { emptyBasket } = useBasket();
    const { t } = useTranslation();
    const handleSubmit = () => {
        emptyBasket();
        close();
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => close(), [close]);
    return (
        <div
            className={styles.basket_confirmation}
            onClick={handleOverlayClick}
        >
            <ConfirmationPopup
                title={t(`pages.basket.emptyBasket`)}
                confirmButtonText={t(`pages.basket.yes`)}
                onCancel={() => close()}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default BasketConfirmation;

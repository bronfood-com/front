import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import BasketEmpty from './BasketEmpty/BasketEmpty';
import Preloader from '../../components/Preloader/Preloader';
import BasketConfirmation from './BasketConfirmation/BasketConfirmation';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Basket() {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isEmpty, restaurant, meals, price, waitingTime, isLoading, errorMessage, reset } = useBasket();
    const close = () => {
        reset();
        navigate(-1);
    };
    return (
        <>
            <BasketPopup close={close} isConfirmationPopupOpen={isConfirmationPopupOpen}>
                {isEmpty ? (
                    <BasketEmpty />
                ) : (
                    <>
                        <BasketDescription waitingTime={waitingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={() => setIsConfirmationPopupOpen(true)} />}</BasketDescription>
                        {errorMessage && <ErrorMessage message={t(`pages.basket.${errorMessage}`)} />}
                        <BasketMealsList meals={meals} />
                        <BasketTotal price={price} />
                    </>
                )}
                {isLoading && <Preloader />}
            </BasketPopup>
            {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
        </>
    );
}

export default Basket;

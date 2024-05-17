import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import BasketEmpty from './BasketEmpty/BasketEmpty';
import Preloader from '../../components/Preloader/Preloader';
import BasketConfirmation from './BasketConfirmation/BasketConfirmation';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';

function Basket() {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const navigate = useNavigate();
    const { isEmpty, restaurant, meals, price, waitingTime, isLoading, submitOrder } = useBasket();
    const close = () => navigate(-1);

    const handlePayOrderClick = () => {
        submitOrder();
        navigate('/waiting-order');
    };

    return (
        <>
            <BasketPopup close={close} isConfirmationPopupOpen={isConfirmationPopupOpen}>
                {isEmpty ? (
                    <BasketEmpty />
                ) : (
                    <>
                        <BasketDescription waitingTime={waitingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={() => setIsConfirmationPopupOpen(true)} />}</BasketDescription>
                        <BasketMealsList meals={meals} />
                        <BasketTotal price={price} onPayOrderClick={handlePayOrderClick} />
                    </>
                )}
                {isLoading && <Preloader />}
            </BasketPopup>
            {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
        </>
    );
}

export default Basket;

import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import BasketEmpty from './BasketEmpty/BasketEmpty';
import Preloader from '../../components/Preloader/Preloader';
import { useState } from 'react';
import BasketConfirmation from './BasketConfirmation/BasketConfirmation';

function Basket() {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const navigate = useNavigate();
    const { isEmpty, restaurant, meals, sum, cookingTime, isLoading } = useBasket();
    const close = () => navigate(-1);
    const handleEmptyBasket = () => {
        setIsConfirmationPopupOpen(true);
    };
    return (
        <>
            <BasketPopup close={close}>
                {isEmpty ? (
                    <BasketEmpty />
                ) : (
                    <>
                        <BasketDescription cookingTime={cookingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={handleEmptyBasket} />}</BasketDescription>
                        <BasketMealsList meals={meals} />
                        <BasketTotal sum={sum} />
                    </>
                )}
                {isLoading && <Preloader />}
            </BasketPopup>
            {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
        </>
    );
}

export default Basket;

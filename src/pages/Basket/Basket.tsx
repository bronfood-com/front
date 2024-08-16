// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
// import Preloader from '../../components/Preloader/Preloader';
// import { useBasket } from '../../utils/hooks/useBasket/useBasket';
// import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
// import BasketConfirmation from './BasketConfirmation/BasketConfirmation';
// import BasketDescription from './BasketDescription/BasketDescription';
// import BasketEmpty from './BasketEmpty/BasketEmpty';
// import BasketMealsList from './BasketMealsList/BasketMealsList';
// import BasketPopup from './BasketPopup/BasketPopup';
// import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
// import BasketTotal from './BasketTotal/BasketTotal';

// function Basket() {
//     const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const { isEmpty, restaurant, meals, price, waitingTime, isLoading, placeOrder, errorMessage, placedOrder, reset } = useBasket();
//     const { currentUser } = useCurrentUser();
//     const userId = currentUser?.userId;
//     const close = () => {
//         reset();
//         navigate(-1);
//     };
//     useEffect(() => {
//         if (placedOrder) {
//             navigate('/waiting-order', { state: { placedOrder } });
//         }
//     }, [placedOrder, navigate]);
//     const handlePayOrder = async () => {
//         if (userId) {
//             await placeOrder(userId, restaurant!.id);
//         }
//     };
//     return (
//         <>
//             <BasketPopup close={close} isConfirmationPopupOpen={isConfirmationPopupOpen}>
//                 {isEmpty ? (
//                     <BasketEmpty />
//                 ) : (
//                     <>
//                         <BasketDescription waitingTime={waitingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={() => setIsConfirmationPopupOpen(true)} />}</BasketDescription>
//                         {errorMessage && <ErrorMessage message={t(`pages.basket.${errorMessage}`)} />}
//                         <BasketMealsList meals={meals} />
//                         <BasketTotal price={price} onPayOrderClick={handlePayOrder} />
//                     </>
//                 )}
//                 {isLoading && <Preloader />}
//             </BasketPopup>
//             {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
//         </>
//     );
// }

// export default Basket;

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import BasketConfirmation from './BasketConfirmation/BasketConfirmation';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketEmpty from './BasketEmpty/BasketEmpty';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import BasketPopup from './BasketPopup/BasketPopup';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import Popup from '../../components/Popups/Popup/Popup';

function Basket() {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isEmpty, restaurant, meals, price, waitingTime, isLoading, placeOrder, errorMessage, placedOrder, reset } = useBasket();
    const { currentUser } = useCurrentUser();
    const userId = currentUser?.userId;

    const close = () => {
        reset();
        navigate(-1);
    };

    useEffect(() => {
        if (placedOrder) {
            navigate('/waiting-order', { state: { placedOrder } });
        }
    }, [placedOrder, navigate]);

    const handlePayOrder = async () => {
        if (userId) {
            await placeOrder(userId, restaurant!.id);
        }
    };

    if (isEmpty) {
        return (
            <Popup onClose={close} mode="info">
                <BasketEmpty />
            </Popup>
        );
    }

    return (
        <>
            <BasketPopup close={close} isConfirmationPopupOpen={isConfirmationPopupOpen}>
                <BasketDescription waitingTime={waitingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={() => setIsConfirmationPopupOpen(true)} />}</BasketDescription>
                {errorMessage && <ErrorMessage message={t(`pages.basket.${errorMessage}`)} />}
                <BasketMealsList meals={meals} />
                <BasketTotal price={price} onPayOrderClick={handlePayOrder} />
                {isLoading && <Preloader />}
            </BasketPopup>
            {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
        </>
    );
}

export default Basket;

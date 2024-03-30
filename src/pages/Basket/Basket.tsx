import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import BasketEmpty from './BasketEmpty/BasketEmpty';

function Basket() {
    const navigate = useNavigate();
    const { isEmpty, emptyBasket, restaurant, meals, sum } = useBasket();
    const close = () => navigate(-1);
    return (
        <BasketPopup close={close}>
            {isEmpty ? (
                <BasketEmpty />
            ) : (
                <>
                    <BasketDescription cookingTime={15}>
                        {
                            restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={emptyBasket} />
                        }
                    </BasketDescription>
                    <BasketMealsList meals={meals} />
                    <BasketTotal sum={sum} />
                </>
            )}
        </BasketPopup>
    );
}

export default Basket;

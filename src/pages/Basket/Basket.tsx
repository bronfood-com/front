import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import { mockRestaurants } from '../Restaurants/MockRestaurantsList';
import BasketTotal from './BasketTotal/BasketTotal';

function Basket() {
    const restaurant = mockRestaurants[0];
    return (
        <BasketPopup close={close}>
            <BasketDescription cookingTime={15}>
                <BasketRestaurant restaurant={restaurant} />
            </BasketDescription>
            <BasketTotal sum={1550} />
        </BasketPopup>
    );
}

export default Basket;

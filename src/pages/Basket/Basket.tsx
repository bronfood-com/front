import BasketPopup from './BasketPopup/BasketPopup'
import BasketDescription from './BasketDescription/BasketDescription'
import BasketRestaurant from './BasketRestaurant/BasketRestaurant'
import BasketTotal from './BasketTotal/BasketTotal'
import BasketMealsList from './BasketMealsList/BasketMealsList'
import { mockRestaurants } from '../Restaurants/MockRestaurantsList'


function Basket() {
    const restaurant = mockRestaurants[0];
    return (
        <BasketPopup close={close}>
            <BasketDescription cookingTime={15}>
                <BasketRestaurant restaurant={restaurant} />
            </BasketDescription>
            <BasketMealsList meals={restaurant.meals} />
            <BasketTotal sum={1550} />
        </BasketPopup>
    );
}

export default Basket;

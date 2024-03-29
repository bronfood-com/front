import BasketPopup from './BasketPopup/BasketPopup';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import { mockRestaurants } from '../Restaurants/MockRestaurantsList';
import { useNavigate } from 'react-router-dom';
import { BasketProvider } from '../../contexts/BasketContext';

function Basket() {
    const navigate = useNavigate();
    const restaurant = mockRestaurants[0];
    const sum = restaurant.meals.reduce((acc, current) => acc + current.price, 0);
    const goBack = () => navigate(`/restaurants/${restaurant.id}`);
    const close = () => navigate('/restaurants');
    return (
        <BasketProvider>
            <BasketPopup close={close} goBack={goBack}>
                <BasketDescription cookingTime={15}>
                    <BasketRestaurant restaurant={restaurant} />
                </BasketDescription>
                <BasketMealsList meals={restaurant.meals} />
                <BasketTotal sum={sum} />
            </BasketPopup>
        </BasketProvider>

    );
}

export default Basket;

import { useNavigate, useParams } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import { Restaurant as RestaurantProps } from '../../../utils/api/restaurantsService/restaurantsService';

function Restaurant() {
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const navigate = useNavigate();
    const close = () => {
        navigate('/restaurants');
    };
    const openFavourites = () => {
        // navigate to favourite restaurants page
    };
    if (restaurant) {
        return (
            <RestaurantPopup close={close} openFavourites={openFavourites}>
                <RestaurantImage image={restaurant.photo} />
                <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
            </RestaurantPopup>
        );
    }
}

export default Restaurant;

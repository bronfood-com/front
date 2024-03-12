import { useNavigate, useParams } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import RestaurantImage from './RestaurantImage/RestaurantImage';

function Restaurant() {
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const restaurant = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const navigate = useNavigate();
    const close = () => {
        navigate('/restaurants');
    };
    return (
        <RestaurantPopup close={close}>
            <RestaurantImage image={restaurant?.photo} />
        </RestaurantPopup>
    );
}

export default Restaurant;

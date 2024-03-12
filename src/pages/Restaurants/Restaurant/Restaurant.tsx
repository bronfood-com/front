import { useNavigate } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';

function Restaurant() {
    const navigate = useNavigate();
    const close = () => {
        navigate('/restaurants');
    };
    return <RestaurantPopup close={close}>asdfasdf</RestaurantPopup>;
}

export default Restaurant;

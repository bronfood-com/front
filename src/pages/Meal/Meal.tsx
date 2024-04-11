import { useNavigate, useParams } from 'react-router-dom';
import MealPopup from './MealPopup/MealPopup';
import MealImage from './MealImage/MealImage';
import MealDescription from './MealDescription/MealDescription';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import MealTotal from './MealTotal/MealTotal';
import MealFeatureList from './MealFeatureList/MealFeatureList';

function Meal() {
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const meal = restaurant.meals.find((meal) => meal.id === params.mealId);
    const goBack = () => {
        navigate(`/restaurants/${params.restaurantId}`);
    };
    const close = () => {
        navigate('/restaurants');
    };
    if (meal) {
        return (
            <MealPopup goBack={goBack} close={close}>
                <MealImage image={meal.photo} />
                <MealDescription name={meal.name} description={meal.description} />
                <MealFeatureList features={meal.features} />
                <MealTotal price={200} />
            </MealPopup>
        );
    }
}

export default Meal;

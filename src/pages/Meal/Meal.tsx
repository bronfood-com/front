import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useBasket } from '../../utils/hooks/useBasket/useBasket';
import MealPopup from './MealPopup/MealPopup';
import MealImage from './MealImage/MealImage';
import MealDescription from './MealDescription/MealDescription';
import MealTotal from './MealTotal/MealTotal';
import MealFeatureList from './MealFeatureList/MealFeatureList';
import Preloader from '../../components/Preloader/Preloader';

function Meal() {
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const {addMeal, isLoading} = useBasket();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const meal = restaurant.meals.find((meal) => meal.id === params.mealId);
    const goBack = () => {
        navigate(`/restaurants/${params.restaurantId}`);
    };
    const close = () => {
        navigate('/restaurants');
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addMeal(meal.id);
        goBack();
    };
    if (meal) {
        return (
            <form onSubmit={handleSubmit}>
                <MealPopup goBack={goBack} close={close}>
                    <MealImage image={meal.photo} />
                    <MealDescription name={meal.name} description={meal.description} />
                    <MealFeatureList features={meal.features} />
                    <MealTotal price={200} />
                    {isLoading && <Preloader />}
                </MealPopup>
            </form>

        );
    }
}

export default Meal;

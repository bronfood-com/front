import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import { Meal, MealType, Restaurant as RestaurantProps } from '../../../utils/api/restaurantsService/restaurantsService';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import MealsFilter from './MealsFilter/MealsFilter';
import Preloader from '../../../components/Preloader/Preloader';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function Restaurant() {
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const { isLoading } = useBasket();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const close = () => {
        navigate('/restaurants');
    };
    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };
    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type: MealType) => type !== mealType));
    };
    if (restaurant) {
        const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
        const mealsFiltered: Meal[] = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type));
        return (
            <RestaurantPopup close={close}>
                <RestaurantImage image={restaurant.photo} />
                <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
                <MealsList meals={mealsFiltered} restaurant={restaurant} />
                {isLoading && <Preloader />}
            </RestaurantPopup>
        );
    }
}

export default Restaurant;

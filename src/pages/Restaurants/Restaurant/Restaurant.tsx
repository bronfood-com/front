import { useNavigate, useParams } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import { Meal, Restaurant as RestaurantProps } from '../../../utils/api/restaurantsService/restaurantsService';
import MealsFilter from './MealsFilter/MealsFilter';
import { useState } from 'react';
import { MealType } from '../../../utils/api/restaurantsService/restaurantsService';

function Restaurant() {
    const [isLiked, setIsLiked] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const close = () => {
        navigate('/restaurants');
    };
    const toggleFavorite = () => {
        setIsLiked(!isLiked);
        // add to favourites logic
    };
    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };
    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type: MealType) => type !== mealType));
    };
    if (restaurant) {
        const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
        const mealsFiltered: Meal[] = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type.toLowerCase()));
        return (
            <RestaurantPopup close={close} onClick={toggleFavorite} isLiked={isLiked}>
                <RestaurantImage image={restaurant.photo} />
                <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
                <MealsList meals={mealsFiltered} />
            </RestaurantPopup>
        );
    }
}

export default Restaurant;

import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from './RestaurantPopup/RestaurantPopup.module.scss';
import { Meal, MealType } from '../../../utils/api/restaurantsService/restaurantsService';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import MealsFilter from './MealsFilter/MealsFilter';
import Preloader from '../../../components/Preloader/Preloader';
import PageNotFound from '../../PageNotFound/PageNotFound';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';
import useGetFavorites from '../../../utils/hooks/useFavorites/useFavorites';
import { useRestaurant } from '../../../utils/hooks/useRestaurant/useRestaurant';

function Restaurant() {
    const { data: favoriteRestaurants, isLoading: favoritesLoading } = useGetFavorites();
    const [isMealPageOpen, setIsMealPageOpen] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const { isLoading: isBasketLoading } = useBasket();
    const { data: restaurant, isLoading } = useRestaurant(restaurantId || '');
    const close = () => {
        navigate('/restaurants');
    };
    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };
    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type: MealType) => type !== mealType));
    };

    if (favoriteRestaurants && restaurant) {
        const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
        const mealsFiltered: Meal[] = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type));
        return (
            <>
                <RestaurantPopup close={close} isMealPageOpen={isMealPageOpen} setIsMealPageOpen={setIsMealPageOpen} restaurant={restaurant}>
                    <RestaurantImage image={restaurant.photo} />
                    <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                    <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
                    <MealsList meals={mealsFiltered} setIsMealPageOpen={setIsMealPageOpen} />
                    {isBasketLoading && <Preloader />}
                </RestaurantPopup>
                <Outlet />
            </>
        );
    } else if (isLoading || favoritesLoading) {
        return (
            <div className={styles.restaurant_popup_overlay}>
                <div className={styles.restaurant_popup}>
                    <Preloader />
                </div>
            </div>
        );
    } else if (!restaurant) {
        return <PageNotFound />;
    }
}

export default Restaurant;

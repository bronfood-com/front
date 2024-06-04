import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from './RestaurantPopup/RestaurantPopup.module.scss';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import { Meal, MealType, Restaurant as RestaurantProps } from '../../../utils/api/restaurantsService/restaurantsService';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import MealsFilter from './MealsFilter/MealsFilter';
import Preloader from '../../../components/Preloader/Preloader';
import PageNotFound from '../../PageNotFound/PageNotFound';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';

function Restaurant() {
    const [isMealPageOpen, setIsMealPageOpen] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered, isLoading } = useRestaurants();
    const { isLoading: isBasketLoading } = useBasket();
    // const { data } = useRestaurantQuery(params.restaurantId ? params.restaurantId : 1 );
    // const restaurant: RestaurantProps | undefined = data;
    const close = () => {
        navigate('/restaurants');
    };
    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };
    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type: MealType) => type !== mealType));
    };
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);

    if (restaurant) {
        const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
        const mealsFiltered: Meal[] = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type));
        return (
            <>
                <RestaurantPopup close={close} isMealPageOpen={isMealPageOpen} setIsMealPageOpen={setIsMealPageOpen}>
                    <RestaurantImage image={restaurant.photo} />
                    <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                    <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
                    <MealsList meals={mealsFiltered} setIsMealPageOpen={setIsMealPageOpen} />
                    {isBasketLoading && <Preloader />}
                </RestaurantPopup>
                <Outlet />
            </>
        );
    } else if (isLoading) {
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

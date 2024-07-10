// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Outlet } from 'react-router-dom';
// import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
// import RestaurantImage from './RestaurantImage/RestaurantImage';
// import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
// import MealsList from './MealsList/MealsList';
// import MealsFilter from './MealsFilter/MealsFilter';
// import Preloader from '../../../components/Preloader/Preloader';
// import PageNotFound from '../../PageNotFound/PageNotFound';
// import { MealType } from '../../../utils/api/restaurantsService/restaurantsService';
// import { useBasket } from '../../../utils/hooks/useBasket/useBasket';
// import useGetFavorites from '../../../utils/hooks/useFavorites/useFavorites';
// import { restaurantsService } from '../../../utils/api/restaurantsService/restaurantsService';
// import styles from './RestaurantPopup/RestaurantPopup.module.scss';

// function Restaurant() {
//     const [isMealPageOpen, setIsMealPageOpen] = useState(false);
//     const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
//     const navigate = useNavigate();
//     const { restaurantId } = useParams();
//     const queryClient = useQueryClient();

//     const {
//         data: restaurant,
//         isLoading: restaurantLoading,
//         isError: restaurantError,
//     } = useQuery({
//         queryKey: ['restaurant', restaurantId],
//         queryFn: async () => {
//             if (!restaurantId) throw new Error('No restaurant ID provided');
//             const response = await restaurantsService.getRestaurantById(restaurantId);
//             if (response.status === 'error') {
//                 throw new Error(response.error_message);
//             }
//             return response.data;
//         },
//         enabled: !!restaurantId,
//         staleTime: 5 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });

//     const { isLoading: isBasketLoading } = useBasket();
//     const { data: favoriteRestaurants, isLoading: favoritesLoading } = useGetFavorites();

//     useEffect(() => {
//         if (restaurantId && restaurant?.id !== restaurantId) {
//             queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] });
//         }
//     }, [restaurantId, restaurant?.id, queryClient]);

//     const close = () => {
//         navigate('/restaurants');
//     };

//     const addMealType = (mealType: MealType) => {
//         setSelectedMealTypes([...selectedMealTypes, mealType]);
//     };

//     const deleteMealType = (mealType: MealType) => {
//         setSelectedMealTypes(selectedMealTypes.filter((type) => type !== mealType));
//     };

//     if (restaurantLoading || favoritesLoading || isBasketLoading) {
//         return (
//             <div className={styles.restaurant_popup_overlay}>
//                 <div className={styles.restaurant_popup}>
//                     <Preloader />
//                 </div>
//             </div>
//         );
//     }

//     if (restaurantError) {
//         return <PageNotFound />;
//     }

//     if (!restaurant || !favoriteRestaurants) {
//         return null;
//     }

//     const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
//     const mealsFiltered = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type));

//     return (
//         <>
//             <RestaurantPopup close={close} isMealPageOpen={isMealPageOpen} setIsMealPageOpen={setIsMealPageOpen} restaurant={restaurant}>
//                 <RestaurantImage image={restaurant.photo} />
//                 <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
//                 <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
//                 <MealsList meals={mealsFiltered} setIsMealPageOpen={setIsMealPageOpen} />
//                 {isBasketLoading && <Preloader />}
//             </RestaurantPopup>
//             <Outlet />
//         </>
//     );
// }

// export default Restaurant;

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import MealsFilter from './MealsFilter/MealsFilter';
import Preloader from '../../../components/Preloader/Preloader';
import PageNotFound from '../../PageNotFound/PageNotFound';
import { MealType } from '../../../utils/api/restaurantsService/restaurantsService';
import { useBasket } from '../../../utils/hooks/useBasket/useBasket';
import useGetFavorites from '../../../utils/hooks/useFavorites/useFavorites';
import styles from './RestaurantPopup/RestaurantPopup.module.scss';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';

function Restaurant() {
    const [isMealPageOpen, setIsMealPageOpen] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const { restaurant, restaurantLoading, restaurantError, setActiveRestaurant } = useRestaurants();

    useEffect(() => {
        if (restaurantId) {
            setActiveRestaurant(restaurantId);
        }
    }, [restaurantId, setActiveRestaurant]);

    const { isLoading: isBasketLoading } = useBasket();
    const { data: favoriteRestaurants, isLoading: favoritesLoading } = useGetFavorites();

    const close = () => {
        navigate('/restaurants');
    };

    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };

    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type) => type !== mealType));
    };

    if (restaurantLoading || favoritesLoading || isBasketLoading) {
        return (
            <div className={styles.restaurant_popup_overlay}>
                <div className={styles.restaurant_popup}>
                    <Preloader />
                </div>
            </div>
        );
    }

    if (restaurantError) {
        return <PageNotFound />;
    }

    if (!restaurant || !favoriteRestaurants) {
        return null;
    }

    const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
    const mealsFiltered = selectedMealTypes.length === 0 ? restaurant.meals : restaurant.meals.filter((meal) => selectedMealTypes.includes(meal.type));

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
}

export default Restaurant;

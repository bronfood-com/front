import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Restaurant, Meal } from '../utils/api/restaurantsService/restaurantsService';

interface MealInBasket extends Meal {
    /**
     * Quantity of particular meal
     */
    quantity: number;
}

type BasketContext = {
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant;
    /**
     * List of meals in basket
     */
    meals: MealInBasket[];
    /**
     * Indicates whether basket is loading content
     */
    /* isLoading: boolean; */
    /**
     * Add restaurant to basket
     */
    addRestaurant: (restaurant: Restaurant) => void;
    /**
     * Delete restaurant from basket
     */
    deleteRestaurant: () => void;
    /**
     * Increment quantity of meals by 1
     */
    addMeal: (meal: MealInBasket) => void;
    /**
     * Decrement quantity of meals by 1
     */
    deleteMeal: (meal: MealInBasket) => void;
    /**
     * Total price of all meals in basket
     */
    sum: number;
};

export const BasketContext = createContext<BasketContext>({
    restaurant: {},
    meals: [],
    /* isLoading: false, */
    addRestaurant: () => {},
    deleteRestaurant: () => {},
    addMeal: () => {},
    deleteMeal: () => {},
    sum: null,
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant>({});
    const [meals, setMeals] = useState<MealInBasket>([]);
    /* const [isLoading, setIsLoading] = useState(false); */
    const addRestaurant = (restaurant: Restaurant) => setRestaurant(restaurant);
    const deleteRestaurant = () => setRestaurant({});
    const increment = (function (n) {
        return function () {
            n += 1;
            return n;
        };
    })(0);
    const decrement = (function (n) {
        return function () {
            n -= 1;
            return n;
        };
    })(0);
    const addMeal = (newMeal: MealInBasket) => {
        const isAlreadyInBasket = meals.find((meal: MealInBasket) => meal.id === newMeal.id);
        if (isAlreadyInBasket) {
            setMeals([...meals, { ...newMeal, quantity: increment() }]);
        } else {
            setMeals([...meals, newMeal]);
        }
    };
    const deleteMeal = (mealToDelete: MealInBasket) => {
        const isMoreThanOne = meals.find((meal: MealInBasket) => meal.id === newMeal.id && meal.quantity > 1);
        if (isMoreThanOne) {
            setMeals([...meals, { ...mealToDelete, quantity: decrement() }]);
        } else {
            setMeals(meals.filter((meal: MealInBasket) => meal.id !== mealToDelete.id));
        }
    };
    /* useEffect(() => {
        const fetchRestaurants = async () => {
            setIsLoading(true);
            const res = await restaurantsService.getRestaurants();
            if (res.status === 'error') {
                setRestaurantsOnMap([]);
                setIsLoading(false);
            } else {
                setRestaurantsOnMap(res.data);
                setIsLoading(false);
            }
        };
        fetchRestaurants();
    }, []); */
    return (
        <BasketContext.Provider
            value={{
                restaurant,
                meals: [],
                /* isLoading, */
                addRestaurant,
                deleteRestaurant,
                addMeal,
                deleteMeal,
                sum: null,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

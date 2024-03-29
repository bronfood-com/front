import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Restaurant, Meal } from '../utils/api/restaurantsService/restaurantsService';

export interface MealInBasket extends Meal {
    /**
     * Quantity of particular meal
     */
    quantity: number;
}

type BasketContext = {
    /**
     * Indicates whether basket is empty
     */
    isEmpty: boolean;
    /**
     * Removes restaurant and all meals from basket
     */
    emptyBasket: () => void;
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant | null;
    /**
     * List of meals in basket
     */
    meals: MealInBasket[];
    /**
     * Indicates whether basket is loading content
     */
    /* isLoading: boolean; */
    /**
     * Add restaurant and meal to basket
     */
    addToBasket: (newRestaurant: Restaurant, newMeal: Meal) => void;
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
    isEmpty: true,
    emptyBasket: () => {},
    restaurant: null,
    meals: [],
    /* isLoading: false, */
    addToBasket: () => {},
    addMeal: () => {},
    deleteMeal: () => {},
    sum: null,
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant>(null);
    const [meals, setMeals] = useState<MealInBasket>([]);
    const sum = meals.reduce((acc, current) => acc + current.price * current.quantity, 0);
    const isEmpty = restaurant ? false : true;
    const emptyBasket = () => {
        setRestaurant(null);
        setMeals([]);
    };
    /* const [isLoading, setIsLoading] = useState(false); */
    const addToBasket = (newRestaurant: Restaurant, newMeal: Meal) => {
        if (restaurant && restaurant.id === newRestaurant.id) {
            addMeal(newMeal);
        } else {
            setRestaurant(newRestaurant);
            setMeals([{ ...newMeal, quantity: 1 }]);
        }
    };
    const addMeal = (newMeal: MealInBasket) => {
        const isAlreadyInBasket = meals.find((meal: MealInBasket) => meal.id === newMeal.id);
        if (isAlreadyInBasket) {
            setMeals(
                meals.map((meal) => {
                    if (meal.id === newMeal.id) {
                        return { ...meal, quantity: meal.quantity + 1 };
                    } else {
                        return meal;
                    }
                }),
            );
        } else {
            setMeals([...meals, { ...newMeal, quantity: 1 }]);
        }
    };
    const deleteMeal = (mealToDelete: MealInBasket) => {
        setMeals(
            meals.map((meal) => {
                if (meal.id === mealToDelete.id) {
                    if (mealToDelete.quantity > 1) {
                        return { ...meal, quantity: meal.quantity - 1 };
                    } else {
                        return { ...meal, quantity: 0 };
                    }
                } else {
                    return meal;
                }
            }),
        );
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
                isEmpty,
                emptyBasket,
                restaurant,
                meals,
                /* isLoading, */
                addToBasket,
                addMeal,
                deleteMeal,
                sum,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

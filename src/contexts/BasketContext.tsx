import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { MealInBasket, basketService } from '../utils/api/basketService/basketService';

type BasketContext = {
    /**
     * Indicates whether basket is empty
     */
    isEmpty: boolean;
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant | Record<string, never>;
    /**
     * Meals in basket
     */
    meals: Array<MealInBasket>;
    /**
     * Indicates whether basket is communicating with server
     */
    isLoading: boolean;
    /**
     * Error message returned from server
     */
    errorMessage: string;
    /**
     * Waiting time before meals are ready for pickup
     */
    waitingTime: number;
    /**
     * Total price of all meals in basket
     */
    price: number;
    /**
     * Add meal to basket
     */
    addMeal: (mealId: string) => Promise<void>;
    /**
     * Delete meal from basket
     */
    deleteMeal: (mealId: string) => Promise<void>;
    /**
     * Removes restaurant and all meals from basket
     */
    emptyBasket: () => Promise<void>;
};

export const BasketContext = createContext<BasketContext>({
    isEmpty: true,
    restaurant: {},
    meals: [],
    isLoading: false,
    errorMessage: '',
    waitingTime: 0,
    price: 0,
    addMeal: () => Promise.resolve(),
    deleteMeal: () => Promise.resolve(),
    emptyBasket: () => Promise.resolve(),
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant | Record<string, never>>({});
    const [meals, setMeals] = useState<Array<MealInBasket>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const price = meals.reduce((acc, current) => acc + current.meal.price * current.count, 0);
    // Longest cooking time among meals in basket
    const waitingTime = meals.some((meal) => meal.count > 0) ? Math.max(...meals.map(({ meal, count }) => (count > 0 ? meal.waitingTime : 0))) : 0;
    const isEmpty = Object.keys(restaurant).length === 0;
    const handleServerResponse = (basket) => {
        if (basket.status === 'error') {
            setErrorMessage(basket.error_message);
        } else {
            const { restaurant, meals } = basket.data;
            setRestaurant(restaurant);
            setMeals(meals);
        }
    };
    const addMeal = async (mealId: string) => {
        setIsLoading(true);
        const basket = await basketService.addMeal(mealId);
        setIsLoading(false);
        handleServerResponse(basket);
    };
    const deleteMeal = async (mealId: string) => {
        setIsLoading(true);
        const basket = await basketService.deleteMeal(mealId);
        setIsLoading(false);
        handleServerResponse(basket)
    };
    const emptyBasket = async () => {
        setIsLoading(true);
        const basket = await basketService.emptyBasket();
        setIsLoading(false);
        handleServerResponse(basket);
    };
    return (
        <BasketContext.Provider
            value={{
                isEmpty,
                restaurant,
                meals,
                isLoading,
                errorMessage,
                waitingTime,
                price,
                addMeal,
                deleteMeal,
                emptyBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

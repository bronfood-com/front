import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Meal, Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { MealInBasket, basketService } from '../utils/api/basketService/basketService';

type BasketContext = {
    /**
     * Indicates whether basket is empty
     */
    isEmpty: boolean;
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant | null;
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
     * Add restaurant and meal to basket
     */
    addToBasket: (newRestaurant: Restaurant, newMeal: Meal) => void;
    /**
     * Increment quantity of meals by 1
     */
    addMeal: (meal: Meal) => void;
    /**
     * Decrement quantity of meals by 1
     */
    deleteMeal: (meal: Meal) => void;
    /**
     * Removes restaurant and all meals from basket
     */
    emptyBasket: () => void;
};

export const BasketContext = createContext<BasketContext>({
    isEmpty: true,
    restaurant: null,
    meals: [],
    isLoading: false,
    errorMessage: '',
    waitingTime: 0,
    price: 0,
    addToBasket: () => {},
    addMeal: () => {},
    deleteMeal: () => {},
    emptyBasket: () => {},
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [meals, setMeals] = useState<Array<MealInBasket>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const price = meals.reduce((acc, current) => acc + current.meal.price * current.count, 0);
    // Longest cooking time among meals in basket
    const waitingTime = Math.max(...meals.map((meal) => meal.meal.waitingTime));
    const isEmpty = restaurant ? false : true;
    const addMeal = async (newMeal: Meal) => {
        const isAlreadyInBasket = 'count' in newMeal ? true : false;
        if (isAlreadyInBasket) {
            setIsLoading(true);
            const res = await basketService.addMeal(newMeal);
            if (res.status === 'error') {
                setIsLoading(false);
                setErrorMessage(res.error_message);
            } else {
                setIsLoading(false);
                setMeals(
                    meals.map((meal) => {
                        if (meal.meal.id === res.data.meal.id) {
                            return { meal: res.data.meal, count: meal.count + 1 };
                        } else {
                            return meal;
                        }
                    }),
                );
            }
        } else {
            setIsLoading(true);
            const res = await basketService.addMeal(newMeal);
            if (res.status === 'error') {
                setIsLoading(false);
                setErrorMessage(res.error_message);
            } else {
                setIsLoading(false);
                setMeals([...meals, { meal: res.data, count: 1 }]);
            }
        }
    };
    const deleteMeal = async (mealToDelete: Meal) => {
        setIsLoading(true);
        const res = await basketService.deleteMeal(mealToDelete);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
        } else {
            setIsLoading(false);
            setMeals(
                meals.map((meal) => {
                    if (meal.meal.id === res.data.meal.id) {
                        if (mealToDelete.count > 1) {
                            return { meal: res.data.meal, count: meal.count - 1 };
                        } else {
                            return { meal: res.data.meal, count: 0 };
                        }
                    } else {
                        return meal;
                    }
                }),
            );
        }
    };
    const addToBasket = (newRestaurant: Restaurant, newMeal: Meal) => {
        if (restaurant && restaurant.id === newRestaurant.id) {
            addMeal(newMeal);
        } else {
            setIsLoading(true);
            Promise.all([basketService.addRestaurant(newRestaurant), basketService.addMeal(newMeal)])
                .then(([newRestaurant, newMeal]) => {
                    if (newRestaurant.status === 'success' && newMeal.status === 'success') {
                        setIsLoading(false);
                        setRestaurant(newRestaurant.data);
                        setMeals([{ meal: newMeal.data, count: 1 }]);
                    } else if (newRestaurant.status === 'error' && newMeal.status === 'error') {
                        setIsLoading(false);
                        setErrorMessage(`${newRestaurant.error_message} ${newMeal.error_message}`);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    setErrorMessage(err);
                });
        }
    };
    const emptyBasket = () => {
        setIsLoading(true);
        Promise.all([basketService.deleteRestaurant(), basketService.deleteMeals()])
            .then(([deleteRestaurant, deleteMeals]) => {
                if (deleteRestaurant.status === 'success' && deleteMeals.status === 'success') {
                    setIsLoading(false);
                    setRestaurant(null);
                    setMeals([]);
                } else if (deleteRestaurant.status === 'error' && deleteMeals.status === 'error') {
                    setIsLoading(false);
                    setErrorMessage(`${deleteRestaurant.error_message} ${deleteMeals.error_message}`);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMessage(err);
            });
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
                addToBasket,
                addMeal,
                deleteMeal,
                emptyBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

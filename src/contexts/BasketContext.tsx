import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { Restaurant, Meal } from '../utils/api/restaurantsService/restaurantsService';
import { MealInBasket, basketService } from '../utils/api/basketService/basketService';

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
     * Indicates whether basket is loading content from server
     */
    isLoading: boolean;
    /**
     * Error message returned from server
     */
    errorMessage: string;
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
    /**
     * Quantity of meals in basket
     */
    total: number | null;
    /**
     * Total cooking time of all meals in basket
     */
    cookingTime: number;
};

export const BasketContext = createContext<BasketContext>({
    isEmpty: true,
    emptyBasket: () => {},
    restaurant: null,
    meals: [],
    isLoading: false,
    errorMessage: '',
    addToBasket: () => {},
    addMeal: () => {},
    deleteMeal: () => {},
    sum: 0,
    total: null,
    cookingTime: 0,
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [meals, setMeals] = useState<MealInBasket[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const sum = meals.reduce((acc, current) => acc + current.price * current.quantity, 0);
    const total = meals.filter((meal) => meal.quantity > 0).length;
    const cookingTime = Math.max(...meals.map((meal) => meal.cookingTime));
    const isEmpty = restaurant ? false : true;
    const addMeal = async (newMeal: MealInBasket | Meal) => {
        const isAlreadyInBasket = meals.find((meal: MealInBasket) => meal.id === newMeal.id);
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
                        if (meal.id === res.data.id) {
                            return { ...res.data, quantity: meal.quantity + 1 };
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
                setMeals([...meals, { ...res.data, quantity: 1 }]);
            }
        }
    };
    const deleteMeal = async (mealToDelete: MealInBasket) => {
        setIsLoading(true);
        const res = await basketService.deleteMeal(mealToDelete);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
        } else {
            setIsLoading(false);
            setMeals(
                meals.map((meal) => {
                    if (meal.id === res.data.id) {
                        if (mealToDelete.quantity > 1) {
                            return { ...res.data, quantity: mealToDelete.quantity - 1 };
                        } else {
                            return { ...res.data, quantity: 0 };
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
                        setMeals([{ ...newMeal.data, quantity: 1 }]);
                    } else {
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
                    localStorage.removeItem('basket');
                } else {
                    setIsLoading(false);
                    setErrorMessage(`${deleteRestaurant.error_message} ${deleteMeals.error_message}`);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMessage(err);
            });
    };
    useEffect(() => {
        if (restaurant) {
            localStorage.setItem(
                'basket',
                JSON.stringify({
                    restaurant,
                    meals,
                }),
            );
        }
    }, [restaurant, meals]);
    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem('basket'));
        if (basket) {
            setRestaurant(basket.restaurant);
            setMeals([...basket.meals]);
        }
    }, []);
    return (
        <BasketContext.Provider
            value={{
                isEmpty,
                emptyBasket,
                restaurant,
                meals,
                isLoading,
                errorMessage,
                addToBasket,
                addMeal,
                deleteMeal,
                sum,
                total,
                cookingTime,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import { Feature, Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { MealInBasket, Basket, basketService } from '../utils/api/basketService/basketService';
import { sumBy } from 'lodash';
import { useMutation } from '@tanstack/react-query';

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
     * Meals in basket. If meal's count = 0 then meal is removed from basket
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
     * Loads restaurant and all meals in basket from server
     */
    getBasket: () => void;
    /**
     * Add meal to basket
     */
    addMeal: (variables: { mealId: string; features: Feature[] | never[] }) => void;
    /**
     * Delete meal from basket
     */
    deleteMeal: (variables: { mealId: string; features: Feature[] | never[] }) => void;
    /**
     * Removes restaurant and all meals from basket on client and server side
     */
    emptyBasket: () => void;
    /**
     * Removes restaurant and all meals from basket on client side only (i.e. on log out)
     */
    emptyBasketOnClientSideOnly: () => void;
};

export const BasketContext = createContext<BasketContext>({
    isEmpty: true,
    restaurant: {},
    meals: [],
    isLoading: false,
    errorMessage: '',
    waitingTime: 0,
    price: 0,
    getBasket: () => Promise.resolve(),
    addMeal: () => Promise.resolve(),
    deleteMeal: () => Promise.resolve(),
    emptyBasket: () => Promise.resolve(),
    emptyBasketOnClientSideOnly: () => {},
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant | Record<string, never>>({});
    const [meals, setMeals] = useState<Array<MealInBasket>>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSuccess = (result: { data: Basket }) => {
        const { restaurant, meals }: Basket = result.data;
        setRestaurant(restaurant);
        setMeals(meals);
    };
    const { mutate: getBasket, isPending: getBasketPending } = useMutation({
        mutationFn: () => basketService.getBasket(),
        onSuccess: (result) => handleSuccess(result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const { mutate: addMeal, isPending: addMealPending } = useMutation({
        mutationFn: ({ mealId, features }: { mealId: string; features: Feature[] }) => basketService.addMeal(mealId, features),
        onSuccess: (result) => handleSuccess(result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const { mutate: deleteMeal, isPending: deleteMealPending } = useMutation({
        mutationFn: ({ mealId, features }: { mealId: string; features: Feature[] }) => basketService.deleteMeal(mealId, features),
        onSuccess: (result) => handleSuccess(result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const { mutate: emptyBasket, isPending: emptyBasketPending } = useMutation({
        mutationFn: () => basketService.emptyBasket(),
        onSuccess: (result) => handleSuccess(result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const isLoading = getBasketPending || addMealPending || deleteMealPending || emptyBasketPending;
    const price = meals.reduce((acc, current) => {
        if (current.meal.features.length > 0) {
            return (
                acc +
                current.count *
                    sumBy(current.meal.features, (feature) => {
                        const isChosen = feature.choices.some((choice) => choice.chosen);
                        if (isChosen) {
                            return feature.choices.filter((choice) => choice.chosen)[0].price;
                        } else {
                            return feature.choices.filter((choice) => choice.default)[0].price;
                        }
                    })
            );
        }
        return acc + current.count * current.meal.price;
    }, 0);
    // Longest cooking time among meals in basket
    const waitingTime = meals.some((meal) => meal.count > 0) ? Math.max(...meals.map(({ meal, count }) => (count > 0 ? meal.waitingTime : 0))) : 0;
    const isEmpty = Object.keys(restaurant).length === 0;
    const emptyBasketOnClientSideOnly = useCallback(() => {
        setRestaurant({});
        setMeals([]);
    }, [])
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
                getBasket,
                addMeal,
                deleteMeal,
                emptyBasket,
                emptyBasketOnClientSideOnly,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

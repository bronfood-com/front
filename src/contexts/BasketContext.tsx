import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Feature, Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { MealInBasket, basketService } from '../utils/api/basketService/basketService';
import { sumBy } from 'lodash';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderState } from '../utils/api/orderService/orderService';

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
     * Place order based on meals in basket by userId
     */
    placeOrder: (userId: string) => void;
    /**
     * Placed order based on OrderState
     */
    placedOrder: OrderState | null;
    /**
     * Cleans mutations' internal state (resets mutations to initial state)
     */
    reset: () => void;
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
    placeOrder: () => Promise.resolve(),
    placedOrder: null,
    reset: () => {},
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [placedOrder, setPlacedOrder] = useState<OrderState | null>(null);
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState('');
    const { data, isSuccess } = useQuery({
        queryKey: ['basket'],
        queryFn: () => basketService.getBasket(),
    });
    // To ensure that `restaurant` is an empty object if data is not yet loaded or there's no restaurant data
    const restaurant = (isSuccess && data?.data?.restaurant) || {};
    // To ensure that `meals` is an empty array if data is not yet loaded or there's no meals data
    const meals: MealInBasket[] = (isSuccess && data?.data?.meals) || [];
    const {
        mutate: addMeal,
        isPending: addMealPending,
        reset: resetAddMeal,
    } = useMutation({
        mutationFn: ({ mealId, features }: { mealId: string; features: Feature[] }) => basketService.addMeal(mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const {
        mutate: deleteMeal,
        isPending: deleteMealPending,
        reset: resetDeleteMeal,
    } = useMutation({
        mutationFn: ({ mealId, features }: { mealId: string; features: Feature[] }) => basketService.deleteMeal(mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const {
        mutate: emptyBasket,
        isPending: emptyBasketPending,
        reset: resetEmptyBasket,
    } = useMutation({
        mutationFn: () => basketService.emptyBasket(),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const { mutate: placeOrder, isPending: placeOrderPending } = useMutation({
        mutationFn: (userId: string) => basketService.placeOrder(userId),
        onSuccess: (result) => {
            queryClient.setQueryData(['basket'], result);
            setPlacedOrder(result);
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const isLoading = addMealPending || deleteMealPending || emptyBasketPending || placeOrderPending;
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
    const reset = () => {
        setErrorMessage('');
        resetAddMeal();
        resetDeleteMeal();
        resetEmptyBasket();
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
                placeOrder,
                placedOrder,
                reset,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

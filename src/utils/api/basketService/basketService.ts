import { BasketServiceMock } from './basketServiceMock';
import { Feature, Meal, Restaurant } from '../restaurantsService/restaurantsService';

export type MealInBasket = {
    /**
     * Meal in basket
     */
    meal: Meal;
    /**
     * Quantity of meal in basket
     */
    count: number;
};

export type Basket = {
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant | Record<string, never>;
    /**
     * List of meals in basket
     */
    meals: MealInBasket[];
};

export interface BasketService {
    addMeal: (mealId: string, fetures?: Feature[]) => Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }>;
    deleteMeal: (mealId: string) => Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }>;
    emptyBasket: () => Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }>;
}

export const basketService = new BasketServiceMock();

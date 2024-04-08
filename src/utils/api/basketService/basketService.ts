import { BasketServiceMock } from './basketServiceMock';
import { Meal, Restaurant } from '../restaurantsService/restaurantsService';

export type MealInBasket = {
    meal: Meal;
    count: number;
};

export type Basket = {
    restaurant: Restaurant | Record<string, never>;
    meals: MealInBasket[];
};

export interface BasketService {
    addMeal: (mealId: string) => Promise<{ status: 'success'; data: string } | { status: 'error'; error_message: string }>;
    deleteMeal: (mealId: string) => Promise<{ status: 'success'; data: string } | { status: 'error'; error_message: string }>;
    emptyBasket: () => Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }>;
}

export const basketService = new BasketServiceMock();

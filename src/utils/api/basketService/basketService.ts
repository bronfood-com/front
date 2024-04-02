import { BasketServiceMock } from './basketServiceMock';
import { Meal, Restaurant } from '../restaurantsService/restaurantsService';

export type MealInBasket = {
    meal: Meal;
    count: number;
};

export interface BasketService {
    addRestaurant: (restaurant: Restaurant) => Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }>;
    deleteRestaurant: () => Promise<{ status: 'success' } | { status: 'error'; error_message: string }>;
    addMeal: (meal: Meal) => Promise<{ status: 'success'; data: Meal } | { status: 'error'; error_message: string }>;
    deleteMeal: (meal: Meal) => Promise<{ status: 'success'; data: Meal } | { status: 'error'; error_message: string }>;
    deleteMeals: () => Promise<{ status: 'success' } | { status: 'error'; error_message: string }>;
}

export const basketService = new BasketServiceMock();

import { BasketServiceMock } from './basketServiceMock';
// import { RestaurantsServiceReal } from './restaurantsServiceReal';
import { Meal, Restaurant } from '../restaurantsService/restaurantsService';

export interface MealInBasket extends Meal {
    /**
     * Quantity of particular meal
     */
    quantity: number;
}

export interface BasketService {
    addRestaurant: (restaurant: Restaurant) => Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }>;
    deleteRestaurant: () => Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }>;
    addMeal: (meal: MealInBasket) => Promise<{ status: 'success'; data: MealInBasket } | { status: 'error'; error_message: string }>;
    deleteMeal: (meal: MealInBasket) => Promise<{ status: 'success'; data: MealInBasket } | { status: 'error'; error_message: string }>;
    deleteMeals: () => Promise<{ status: 'success' } | { status: 'error'; error_message: string }>;
}

// export const restaurantsService = new RestaurantsServiceReal();
export const basketService = new BasketServiceMock();

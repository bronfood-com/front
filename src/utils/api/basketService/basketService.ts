import { BasketServiceMock } from './basketServiceMock';
import { Feature, Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { OrderedMeal, OrderState } from '../orderService/orderService';

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
    getBasket: () => Promise<{ data: Basket }>;
    addMeal: (mealId: string, fetures: Feature[] | never[]) => Promise<{ data: Basket }>;
    deleteMeal: (mealId: string, fetures: Feature[] | never[]) => Promise<{ data: Basket }>;
    emptyBasket: () => Promise<{ data: Basket }>;
    submitOrder(meals: OrderedMeal[]): Promise<OrderState>;
}

export const basketService = new BasketServiceMock();

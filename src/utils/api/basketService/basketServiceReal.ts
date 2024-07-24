import { BasketService, Basket } from './basketService';
import { Feature } from '../restaurantsService/restaurantsService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class BasketServiceReal implements BasketService {
    async getBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket');
    }
    async addMeal(restaurantId: string, mealId: string, features: Feature[] | never[]): Promise<{ data: Basket }> {
        return handleFetch('api/basket/add_meal', { method: 'POST', data: { restaurantId, mealId, features } });
    }
    async deleteMeal(restaurantId: string, mealId: string, features: Feature[] | never[]): Promise<{ data: Basket }> {
        return handleFetch('api/basket/delete_meal', { method: 'POST', data: { restaurantId, mealId, features } });
    }
    async emptyBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket/empty');
    }
}

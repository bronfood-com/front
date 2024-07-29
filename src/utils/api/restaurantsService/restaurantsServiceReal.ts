import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Meal, Restaurant, RestaurantsService } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    private _restaurantsCache: Restaurant[] | null = null;

    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        if (this._restaurantsCache !== null) {
            return {
                status: 'success',
                data: this._restaurantsCache,
            };
        }
        const responseData = await handleFetch('api/restaurant');
        this._restaurantsCache = responseData.data;
        return responseData;
    }

    async getRestaurantById(id: string): Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }> {
        if (this._restaurantsCache !== null) {
            const restaurant = this._restaurantsCache.find((r) => r.id === id);
            if (restaurant) {
                return {
                    status: 'success',
                    data: restaurant,
                };
            }
        }
        const restaurant = await handleFetch(`api/restaurant/${id}`);
        return {
            status: 'success',
            data: restaurant.data,
        };
    }

    async getMeals(restaurantId: string): Promise<{ status: 'success'; data: Meal[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/restaurant/${restaurantId}/menu`);
    }
}

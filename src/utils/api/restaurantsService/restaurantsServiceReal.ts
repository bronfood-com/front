import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Restaurant, Meal, RestaurantsService } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    private _allMealsCache: Meal[] | null = null;
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

    async getAllMeals(): Promise<Meal[]> {
        if (this._allMealsCache !== null) {
            return this._allMealsCache;
        }
        const responseData: Meal[] = await handleFetch('api/meals');
        this._allMealsCache = responseData;
        return this._allMealsCache;
    }

    async getRestaurantById(id: string): Promise<{ status: 'success'; data: Restaurant & { meals: Meal[] } } | { status: 'error'; error_message: string }> {
        if (this._restaurantsCache !== null) {
            const restaurant = this._restaurantsCache.find((r) => r.id === id);
            if (restaurant) {
                return {
                    status: 'success',
                    data: { ...restaurant, meals: this._allMealsCache || [] },
                };
            }
        }
        const restaurant = await handleFetch(`api/restaurant/${id}`);
        if (this._allMealsCache === null) {
            this._allMealsCache = await this.getAllMeals();
        }
        return {
            status: 'success',
            data: { ...restaurant.data, meals: this._allMealsCache },
        };
    }
}

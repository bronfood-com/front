import { RestaurantsService, RestaurantWithoutMeals, Restaurant } from './restaurantsService';
import { mockOneRestaurant, mockRestaurantsNew, mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class RestaurantsServiceMock implements RestaurantsService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = true;
        if (token) {
            return { status: 'success', data: mockRestaurants };
        } else {
            throw new Error('error');
        }
    }

    async getRestaurantsNew(): Promise<{ status: 'success'; data: RestaurantWithoutMeals[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = true;
        if (token) {
            return { status: 'success', data: mockRestaurantsNew };
        } else {
            throw new Error('error');
        }
    }

    async getRestaurantNew(id: string | number): Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = true;
        if (token && id) {
            return { status: 'success', data: mockOneRestaurant };
        } else {
            throw new Error('error');
        }
    }
}

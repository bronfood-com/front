import { RestaurantsService, Restaurant } from './restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class RestaurantsServiceMock implements RestaurantsService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        return new Promise((resolve, reject) => {
            const token = true;
            if (token) {
                resolve({ status: 'success', data: mockRestaurants });
            } else {
                reject({ status: 'error', error_message: 'error' });
            }
        })
    }
}

import { MealInBasket, BasketService } from './basketService';
import { Restaurant } from '../restaurantsService/restaurantsService';

export class BasketServiceMock implements BasketService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    getToken() {
        return 'token';
    }
    async addRestaurant(restaurant: Restaurant): Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success', data: restaurant };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async deleteRestaurant(): Promise<{ status: 'success' } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success' };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async addMeal(meal: MealInBasket): Promise<{ status: 'success'; data: MealInBasket } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success', data: meal };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async deleteMeal(meal: MealInBasket): Promise<{ status: 'success'; data: MealInBasket } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success', data: meal };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async deleteMeals(): Promise<{ status: 'success' } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success' };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
}

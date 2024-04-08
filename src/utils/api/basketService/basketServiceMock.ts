import { BasketService, Basket } from './basketService';
import { Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class BasketServiceMock implements BasketService {
    private basket: Basket = {
        restaurant: {},
        meals: [],
    };
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async addMeal(mealId: string): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const restaurantFound = mockRestaurants.find((restaurant: Restaurant) => {
            const found = restaurant.meals.find((meal) => meal.id === mealId);
            if (found) {
                return restaurant;
            }
        });
        const hasRestaurantChanged = restaurantFound && this.basket.restaurant.id !== restaurantFound.id;
        const mealFound = restaurantFound && restaurantFound.meals.find((meal: Meal) => meal.id === mealId);
        if (mealFound) {
            this.basket.restaurant = restaurantFound;
            this.basket.meals =
                this.basket.meals.length === 0 || hasRestaurantChanged
                    ? [{ meal: mealFound, count: 1 }]
                    : this.basket.meals.some(({ meal }) => meal.id === mealFound.id)
                      ? this.basket.meals.map(({ meal, count }) => {
                            if (meal.id === mealFound.id) {
                                return { meal, count: count + 1 };
                            } else {
                                return { meal, count };
                            }
                        })
                      : [...this.basket.meals, { meal: mealFound, count: 1 }];
            return { status: 'success', data: this.basket };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async deleteMeal(mealId: string): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const mealFound = this.basket.meals.find(({ meal }) => meal.id === mealId);
        if (mealFound) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealFound.meal.id && count >= 1) {
                    return { meal, count: count - 1 };
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: this.basket };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async emptyBasket(): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        this.basket.restaurant = {};
        this.basket.meals = [];
        const success = true;
        if (success) {
            return { status: 'success', data: this.basket };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
}

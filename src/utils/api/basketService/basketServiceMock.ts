import { BasketService, Basket } from './basketService';
import { Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

const basket: Basket = {
    restaurant: {},
    meals: [],
};

export class BasketServiceMock implements BasketService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async addMeal(mealId: string): Promise<{ status: 'success'; data: string } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const restaurantFound = mockRestaurants.find((restaurant: Restaurant) => {
            const found = restaurant.meals.find((meal) => meal.id === mealId);
            if (found) {
                return restaurant;
            }
        });
        const hasRestaurantChanged = basket.restaurant.id !== restaurantFound?.id;
        const mealFound = restaurantFound.meals.find((meal: Meal) => meal.id === mealId);
        if (mealFound) {
            basket.restaurant = restaurantFound;
            basket.meals =
                basket.meals.length === 0 || hasRestaurantChanged
                    ? [{ meal: mealFound, count: 1 }]
                    : basket.meals.some(({ meal }) => meal.id === mealFound.id)
                      ? basket.meals.map(({ meal, count }) => {
                            if (meal.id === mealFound.id) {
                                return { meal, count: count + 1 };
                            } else {
                                return { meal, count };
                            }
                        })
                      : [...basket.meals, { meal: mealFound, count: 1 }];
            return { status: 'success', data: mealFound.id };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async deleteMeal(mealId: string): Promise<{ status: 'success'; data: string } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const mealFound = basket.meals.find(({ meal }) => meal.id === mealId);
        if (mealFound) {
            basket.meals = basket.meals.map(({ meal, count }) => {
                if (meal.id === mealFound.meal.id) {
                    if (count <= 0) {
                        return { meal, count: 0 };
                    } else {
                        return { meal, count: count - 1 };
                    }
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: mealFound.id };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async getBasket(): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const success = true;
        if (success) {
            return { status: 'success', data: basket };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
    async emptyBasket(): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        basket.restaurant = {};
        basket.meals = [];
        const success = true;
        if (success) {
            return { status: 'success', data: basket };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
}

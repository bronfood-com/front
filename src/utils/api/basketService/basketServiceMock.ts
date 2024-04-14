import { uniqueId } from 'lodash';
import { BasketService, Basket } from './basketService';
import { Feature, Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class BasketServiceMock implements BasketService {
    private basket: Basket = {
        restaurant: {},
        meals: [],
    };
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async addMeal(mealId: string, features?: Feature[]): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const restaurantFound = mockRestaurants.find((restaurant: Restaurant) => {
            const found = restaurant.meals.find((meal) => meal.id === mealId);
            if (found) {
                return restaurant;
            }
        });
        const hasRestaurantChanged = restaurantFound && this.basket.restaurant.id !== restaurantFound.id;
        const mealFoundInBasket = this.basket.meals.find(({ meal }) => meal.id === mealId);
        const mealFoundInRestaurants = restaurantFound && restaurantFound.meals.find((meal: Meal) => meal.id === mealId);
        const isMealFeaturesDifferent = mealFoundInRestaurants?.features !== features || mealFoundInBasket?.meal.features !== features;
        if (mealFoundInBasket) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId && isMealFeaturesDifferent) {
                    return { meal: { ...meal, features, id: uniqueId() }, count: count + 1 };
                } else if (meal.id === mealId && !isMealFeaturesDifferent) {
                    return { meal: { ...meal, id: uniqueId() }, count: count + 1 };
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: this.basket };
        } else if (mealFoundInRestaurants) {
            this.basket.restaurant = restaurantFound;
            this.basket.meals =
                this.basket.meals.length === 0 || hasRestaurantChanged
                    ? [{ meal: { ...mealFoundInRestaurants, features, id: uniqueId() }, count: 1 }]
                    : this.basket.meals.some(({ meal }) => meal.id === mealId) && !isMealFeaturesDifferent
                      ? this.basket.meals.map(({ meal, count }) => {
                            if (meal.id === mealId) {
                                if (features) {
                                    return { meal: { ...meal, features, id: uniqueId() }, count: count + 1 };
                                } else {
                                    return { meal: { ...meal, id: uniqueId() }, count: count + 1 };
                                }
                            } else {
                                return { meal, count };
                            }
                        })
                      : [...this.basket.meals, { meal: { ...mealFoundInRestaurants, features, id: uniqueId() }, count: 1 }];
            return { status: 'success', data: this.basket };
        } else {
            return { status: 'error', error_message: 'serverError' };
        }
    }
    async deleteMeal(mealId: string): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const mealFoundInRestaurants = this.basket.meals.find(({ meal }) => meal.id === mealId);
        if (mealFoundInRestaurants && mealFoundInRestaurants.count > 1) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId) {
                    return { meal, count: count - 1 };
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: this.basket };
        } else if (mealFoundInRestaurants && mealFoundInRestaurants.count === 1) {
            this.basket.meals = this.basket.meals.filter(({ meal }) => meal.id !== mealId);
            return { status: 'success', data: this.basket };
        } else {
            return { status: 'error', error_message: 'serverError' };
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
            return { status: 'error', error_message: 'serverError' };
        }
    }
}

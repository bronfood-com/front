import { BasketService, Basket } from './basketService';
import { Feature, Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

// temporary url for testing by fake server
const API_BASE_URL = 'http://localhost:3000';

export class BasketServiceMock implements BasketService {
    private basket: Basket = {
        restaurant: {},
        meals: [],
    };
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async getBasket(): Promise<{ data: Basket }> {
        await this._wait(500);
        const success = true;
        if (success) {
            return { data: this.basket };
        } else {
            throw new Error('serverError');
        }
    }
    async addMeal(mealId: string, features: Feature[] | never[]): Promise<{ data: Basket }> {
        await this._wait(500);
        const restaurantFound = mockRestaurants.find((restaurant: Restaurant) => {
            const found = restaurant.meals.find((meal) => meal.id === mealId);
            if (found) {
                return restaurant;
            }
        });
        const hasRestaurantChanged = restaurantFound && this.basket.restaurant.id !== restaurantFound.id;
        const mealFoundInBasket = this.basket.meals.find(({ meal }) => meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features));
        const mealFoundInRestaurants = restaurantFound && restaurantFound.meals.find((meal: Meal) => meal.id === mealId);
        if (mealFoundInBasket) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features)) {
                    return { meal, count: count + 1 };
                } else {
                    return { meal, count };
                }
            });
            return { data: this.basket };
        } else if (mealFoundInRestaurants) {
            if (this.basket.meals.length === 0 || hasRestaurantChanged) {
                this.basket.restaurant = restaurantFound;
                if (features.length > 0) {
                    this.basket.meals = [{ meal: { ...mealFoundInRestaurants, features, id: mealFoundInRestaurants.id }, count: 1 }];
                } else {
                    this.basket.meals = [{ meal: mealFoundInRestaurants, count: 1 }];
                }
            } else {
                this.basket.meals = [...this.basket.meals, { meal: { ...mealFoundInRestaurants, features, id: mealFoundInRestaurants.id }, count: 1 }];
            }
            return { data: this.basket };
        } else {
            throw new Error('serverError');
        }
    }
    async deleteMeal(mealId: string, features: Feature[] | never[]): Promise<{ data: Basket }> {
        await this._wait(500);
        const mealFoundInBasket = this.basket.meals.find(({ meal }) => meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features));
        if (mealFoundInBasket && mealFoundInBasket.count > 1) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features)) {
                    return { meal, count: count - 1 };
                } else {
                    return { meal, count };
                }
            });
            return { data: this.basket };
        } else if (mealFoundInBasket && mealFoundInBasket.count === 1) {
            this.basket.meals = this.basket.meals.filter(({ meal }) => {
                if (meal.id !== mealId) {
                    return true;
                } else if (JSON.stringify(meal.features) !== JSON.stringify(features)) {
                    return true;
                } else {
                    return false;
                }
            });
            return { data: this.basket };
        } else {
            throw new Error('serverError');
        }
    }
    async emptyBasket(): Promise<{ data: Basket }> {
        await this._wait(500);
        this.basket.restaurant = {};
        this.basket.meals = [];
        const success = true;
        if (success) {
            return { data: this.basket };
        } else {
            throw new Error('serverError');
        }
    }
    async placeOrder(userId: string): Promise<{ data: string | null, error: string | null }> {
        await this._wait(2000);
        const order = {
            userId,
            id: `order-${Date.now()}`,
            totalAmount: this.basket.meals.reduce((sum, { meal, count }) => sum + meal.price * count, 0),
            preparationStatus: 'waiting',
            preparationTime: this.basket.meals.reduce((maxTime, { meal }) => Math.max(maxTime, meal.waitingTime), 0),
            paymentStatus: 'paid', // to be checked after adding payment system
            reviewStatus: 'waiting',
            cancellationTime: 120,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderedMeal: this.basket.meals.map(({ meal, count }) => ({ orderedMeal: meal, quantity: count }))
        };
        return fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to place order'); // to be checked when error keys will be added
            }
            return { data: order.id, error: null };
        })
        .catch(error => {
            return { data: null, error: error.message };
        });
    }
}

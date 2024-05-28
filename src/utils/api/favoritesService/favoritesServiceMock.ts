import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';
import { FavoritesService } from './favoritesService';

export const mockUser = {
    favorites: [mockRestaurants[0].id, mockRestaurants[1].id, mockRestaurants[2].id],
};

export class FavoritesServiceMock implements FavoritesService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getFavorites(): Promise<{ status: 'success'; data: string[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = true;
        if (!token) {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }

    async setFavorites(restId: string): Promise<{ status: 'success'; data: string[] } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            mockUser.favorites.push(restId);
        } else {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }

    async deleteFavorites(restId: string): Promise<{ status: 'success'; data: string[] | null } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            const newFavorites = mockUser.favorites.filter((rest) => rest !== restId) ?? null;
            mockUser.favorites = newFavorites;
        } else {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }
}

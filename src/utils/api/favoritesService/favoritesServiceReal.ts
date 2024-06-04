import { API_URL } from '../../consts';
import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';

export class FavoritesServiceReal implements FavoritesService {
    _getToken() {
        return localStorage.getItem('token');
    }

    async getFavorites(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        const res = await fetch(`${API_URL}/api/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Token ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('error');
        }
        return res.json();
    }

    async setFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[]  } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        const res = await fetch(`${API_URL}/api/favorites/${restId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Token ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('error');
        }
        return res.json();
    }

    async deleteFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[]  } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        const res = await fetch(`${API_URL}/api/favorites/${restId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Token ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('error');
        }
        return res.json();
    }
}

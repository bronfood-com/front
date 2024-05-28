import { FavoritesServiceMock } from './favoritesServiceMock';

export interface FavoritesService {
    getFavorites: (userId: string) => Promise<{ status: 'success'; data: string[] } | { status: 'error'; error_message: string }>;
    setFavorites: (restId: string) => Promise<{ status: 'success'; data: string[] } | { status: 'error'; error_message: string }>;
    deleteFavorites: (restId: string) => Promise<{ status: 'success'; data: string[] | null } | { status: 'error'; error_message: string }>;
}

// export const restaurantsService = new FavoritesServiceReal();
export const favoritesService = new FavoritesServiceMock();

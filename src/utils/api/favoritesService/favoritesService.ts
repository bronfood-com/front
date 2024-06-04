import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesServiceMock } from './favoritesServiceMock';
// import { FavoritesServiceReal } from './favoritesServiceReal';

export interface FavoriteRestaurant {
    /**
     * Venue's id
     */
    id: string;
    /**
     * Link to venue's image
     */
    photo: string;
    /**
     * Venue's name
     */
    name: string;
    /**
     * Venue's rating
     */
    rating: number;
    /**
     * Venue's address
     */
    address: string;
    /**
     * User's like
     */
  /*   isLiked: boolean; */
}

export interface FavoritesService {
    getFavorites: (userId: string) => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
    setFavorites: (restId: string) => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
    deleteFavorites: (restId: string) => Promise<{ status: 'success'; data: Restaurant[] | null } | { status: 'error'; error_message: string }>;
}

// export const favoritesService = new FavoritesServiceReal();
export const favoritesService = new FavoritesServiceMock();

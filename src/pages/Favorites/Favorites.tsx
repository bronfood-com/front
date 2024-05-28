import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Favorites.module.scss';
import { t } from 'i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';
import { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';
import useGetFavorites, { useFavoritesMutations } from '../../utils/hooks/useFavorites/useFavorites';

interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    error_message?: string;
}

const Favorites = () => {
    const { deleteFavorite } = useFavoritesMutations();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [favoritesList, setFavoritesList] = useState<Restaurant[]>([]);

    const { data: favoritesData, error: favoritesError, isLoading: favoritesLoading, isFetching: favoritesFetching } = useGetFavorites();

    useEffect(() => {
        const restaurantsData = queryClient.getQueryData<ApiResponse<Restaurant[]>>(['restaurants']);
        if (restaurantsData && favoritesData) {
            const favoriteRestaurants = restaurantsData.data.filter((restaurant) => favoritesData.includes(restaurant.id));
            setFavoritesList(favoriteRestaurants);
        }
    }, [favoritesData, queryClient]);

    const handleDeleteFavorite = (id: string) => deleteFavorite.mutate(id);

    return (
        <Popup
            title={t('pages.favorites.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            {favoritesFetching ? <Preloader /> : ''}
            {favoritesLoading ? (
                <Preloader />
            ) : (
                <>
                    {favoritesError ? (
                        <span className={styles.favorites__error}>{t('pages.favorites.error_load')}</span>
                    ) : (
                        <div className={styles.favorites}>
                            {favoritesList.length > 0 ? (
                                <ul>
                                    {favoritesList.map((restaurant) => (
                                        <li key={restaurant.id}>
                                            {restaurant.name} - {restaurant.address} ({restaurant.rating})<button onClick={() => handleDeleteFavorite(restaurant.id)}>delete</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className={styles.favorites__empty}>{t('pages.favorites.list_empty')}</span>
                            )}
                        </div>
                    )}
                </>
            )}
        </Popup>
    );
};

export default Favorites;

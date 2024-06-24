import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';
import { Restaurant } from '../../api/restaurantsService/restaurantsService';
import i18n from '../../../i18n';

const getRestaurantById = async (id: string): Promise<Restaurant> => {
    const response = await restaurantsService.getRestaurantById(id);

    if (response.status === 'success') {
        return response.data;
    } else {
        throw new Error(i18n.t(response.error_message) || i18n.t('errors.anUnexpectedErrorHasOccurred'));
    }
};

export const useRestaurant = (id: string) => {
    return useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id),
        enabled: !!id,
        retry: false,
    });
};

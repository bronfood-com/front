import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useRestaurantQuery = (id: string | number) => {
    return useQuery({
        queryKey: ['restaurantsNew', id],
        queryFn: () =>
            restaurantsService
                .getRestaurantNew(id)
                .then((res) => {
                    if (res.status === 'success' && 'data' in res) {
                        return res.data;
                    } else throw new Error('no data property in answer object');
                })
                .catch((e) => {
                    alert(`Ошибка в useRestaurantQuery: ${e}`);
                    return [];
                }),
        // staleTime: 1000*5,
    });
};

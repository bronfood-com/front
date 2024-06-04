import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useAllRestaurantsQuery = () => {
    return useQuery({
        queryKey: ['restaurantsNew'],
        queryFn: () =>
            restaurantsService
                .getRestaurantsNew()
                .then((res) => {
                    if (res.status === 'success' && 'data' in res) {
                        return res.data;
                    } else throw new Error('no data property in answer object');
                })
                .catch((e) => {
                    alert(`Ошибка в useAllRestaurantsQuery: ${e}`);
                    return [];
                }),
        // staleTime: 1000*5,
    });
};

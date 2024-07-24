import { useQuery } from '@tanstack/react-query';
import { basketService } from '../../api/basketService/basketService';

export const useGetBasket = () => {
    return useQuery({
        queryKey: ['basket'],
        queryFn: () => basketService.getBasket(),
    });
};
